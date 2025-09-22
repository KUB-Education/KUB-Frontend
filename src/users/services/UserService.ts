import { BaseService } from '@/common/services';
import { UserProfileDto } from '@/users/services/dto';
import { UserProfileDtoMapper } from '@/users/mappers';
import {
  AddUserParams,
  AddUserRoleParams,
  DeleteUserRoleParams,
  EditUserParams,
  User,
  UserId,
  UserRole,
  UserStatus,
  userStatuses,
} from '@/users/entities';
import { faker } from '@faker-js/faker';
import { delay, SECOND } from '@/common/utils';

export class UserService extends BaseService {
  private users: User[] = [];

  private userRoles: Record<UserId, UserRole[]> = {};

  async getProfile() {
    const dtoMapper = new UserProfileDtoMapper();

    const { data } = await this.http.get<UserProfileDto>('/user/me');

    return dtoMapper.toEntity(data);
  }

  async getUsers(): Promise<User[]> {
    await delay(2 * SECOND);
    const array = new Array(5).fill(null);

    if (this.users.length) return this.users;

    this.users = array.map(() => ({
      id: faker.number.int(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      userStatus: faker.helpers.arrayElement(userStatuses),
    }));

    return this.users;
  }

  async addUser(params: AddUserParams) {
    await delay(2 * SECOND);

    this.users.push({
      id: faker.number.int(),
      ...params,
      userStatus: faker.helpers.arrayElement(userStatuses),
    });
  }

  async editUser(params: EditUserParams) {
    await delay(2 * SECOND);

    this.users = this.users.map((user) => {
      if (user.id !== params.id) return user;
      return { ...user, ...params };
    });
  }

  async deleteUsers(ids: Array<UserId>) {
    await delay(2 * SECOND);
    this.users = this.users.filter((user) => !ids.includes(user.id));
  }

  async resendUsersActivationEmail(ids: Array<UserId>) {
    await delay(2 * SECOND);
    this.users = this.users.map((user) => {
      if (!ids.includes(user.id)) return user;

      return { ...user, userStatus: UserStatus.ACTIVATION_PENDING };
    });
  }

  async getUserRoles(userId: UserId) {
    const userRoles = this.userRoles[userId] || [];

    if (userRoles && userRoles.length) return userRoles;

    userRoles.push(faker.helpers.arrayElement(Object.values(UserRole)));

    this.userRoles[userId] = userRoles;

    return this.userRoles[userId];
  }

  async addUserRole(params: AddUserRoleParams) {
    await delay(2 * SECOND);

    const userRoles = this.userRoles[params.userId] || [];

    if (userRoles.includes(params.role)) return;

    this.userRoles[params.userId] = [...userRoles, params.role];
  }

  async deleteUserRole(params: DeleteUserRoleParams) {
    await delay(2 * SECOND);

    this.userRoles[params.userId] = this.userRoles[params.userId].filter(
      (role) => role !== params.role,
    );
  }
}

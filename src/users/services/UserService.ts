import { BaseService } from '@/common/services';
import { UserProfileDto } from '@/users/services/dto';
import { UserProfileDtoMapper } from '@/users/mappers';
import { AddUserParams, User, UserId, userStatuses } from '@/users/entities';
import { faker } from '@faker-js/faker';
import { delay, SECOND } from '@/common/utils';

export class UserService extends BaseService {
  private users: User[] = [];

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

  async deleteUser(ids: Array<UserId>) {
    await delay(2 * SECOND);
    this.users = this.users.filter((user) => !ids.includes(user.id));
  }
}

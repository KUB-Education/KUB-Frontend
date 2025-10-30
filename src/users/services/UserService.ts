import { BaseService } from '@/common/services';
import {
  AddUserParams,
  AddUserRoleParams,
  DeleteUserRoleParams,
  EditUserParams,
  User,
  UserId,
  UserRole,
} from '@/users/entities';
import { UserDto, UserRoleDto } from './dto';
import { UserDtoMapper } from '@/users/mappers';

export class UserService extends BaseService {
  async getUsers(): Promise<User[]> {
    const dtoMapper = new UserDtoMapper();
    const { data } = await this.http.get<UserDto[]>('/v1/users');

    return data.map((dto) => dtoMapper.toEntity.bind(dtoMapper)(dto));
  }

  async addUser(params: AddUserParams): Promise<User> {
    const dtoMapper = new UserDtoMapper();

    const { data } = await this.http.post('/v1/users', {
      data: {
        first_name: params.firstName,
        last_name: params.lastName,
        middle_name: params.middleName,
        email: params.email,
      },
    });

    return dtoMapper.toEntity(data);
  }

  async editUser(params: EditUserParams) {
    const dtoMapper = new UserDtoMapper();

    const { data } = await this.http.put(`/v1/users/${params.id}`, {
      data: {
        first_name: params.firstName,
        last_name: params.lastName,
        middle_name: params.middleName,
        email: params.email,
      },
    });

    return dtoMapper.toEntity(data);
  }

  async deleteUsers(ids: Array<UserId>) {
    return Promise.all(
      ids.map((id) => {
        return this.http.delete(`/v1/users/${id}`);
      }),
    );
  }

  async resendUsersActivationEmail(ids: Array<UserId>) {
    return Promise.all(
      ids.map((id) => {
        return this.http.post(`/v1/users/${id}/resend`);
      }),
    );
  }

  async getRoles(): Promise<UserRole[]> {
    const { data } = await this.http.get<UserRoleDto[]>('/v1/roles');

    return data;
  }

  async addUserRole(params: AddUserRoleParams) {
    await this.http.put(`/v1/users/${params.userId}/roles/${params.role.id}`);
  }

  async deleteUserRole(params: DeleteUserRoleParams) {
    await this.http.delete(
      `/v1/users/${params.userId}/roles/${params.role.id}`,
    );
  }
}

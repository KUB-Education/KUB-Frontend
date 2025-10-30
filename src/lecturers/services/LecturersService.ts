import { BaseService } from '@/common/services';
import {
  AcademicTitle,
  AddLecturerParams,
  AddDepartmentPositionParams,
  EditLecturerParams,
  Lecturer,
  LecturerId,
  EditDepartmentPositionParams,
  AddAcademicTitleParams,
  DeleteAcademicTitleParams,
  DeleteDepartmentPositionParams,
  LecturerPosition,
} from '@/lecturers/entities';
import { HttpClient } from '@/common/http-client';
import {
  AcademicTitleDto,
  LecturerDto,
  LecturerPositionDto,
} from '@/lecturers/services/dto';
import { LecturerDtoMapper } from '@/lecturers/mappers';
import { UserService } from '@/users/services';

export class LecturersService extends BaseService {
  constructor(
    httpClient: HttpClient,
    private readonly userService: UserService,
  ) {
    super(httpClient);
  }

  async getPositions(): Promise<LecturerPosition[]> {
    const { data } =
      await this.http.get<LecturerPositionDto[]>('/v1/positions');

    return data;
  }

  async editLecturer(params: EditLecturerParams) {
    return this.userService.editUser({
      id: params.userId,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      middleName: params.middleName,
    });
  }

  async getLecturers(): Promise<Lecturer[]> {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.get<LecturerDto[]>('/v1/lecturers');

    return data.map((dto) => dtoMapper.toEntity.call(dtoMapper, dto));
  }

  async addLecturer(params: AddLecturerParams): Promise<Lecturer> {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.post<LecturerDto>('/v1/lecturers', {
      data: {
        first_name: params.firstName,
        last_name: params.lastName,
        middle_name: params.middleName,
        email: params.email,
      },
    });

    return dtoMapper.toEntity(data);
  }

  async deleteLecturers(ids: Array<LecturerId>) {
    return Promise.all(
      ids.map((id) => {
        return this.http.delete(`/v1/lecturers/${id}`);
      }),
    );
  }

  async addLecturerDepartmentPosition(params: AddDepartmentPositionParams) {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.post<LecturerDto>(
      `/v1/lecturers/${params.lecturerId}/department-positions`,
      {
        data: {
          department_id: params.departmentId,
          position_id: params.positionId,
        },
      },
    );

    return dtoMapper.toEntity(data);
  }

  async editLecturerDepartmentPosition(params: EditDepartmentPositionParams) {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.put<LecturerDto>(
      `/v1/lecturers/${params.lecturerId}/department-positions/${params.departmentPositionId}`,
      {
        data: {
          position_id: params.positionId,
          status: params.status,
        },
      },
    );

    return dtoMapper.toEntity(data);
  }

  async deleteLecturerDepartmentPosition(
    params: DeleteDepartmentPositionParams,
  ) {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.delete<LecturerDto>(
      `/v1/lecturers/${params.lecturerId}/department-positions/${params.departmentPositionId}`,
    );

    return dtoMapper.toEntity(data);
  }

  async getAcademicTitles(): Promise<AcademicTitle[]> {
    const { data } = await this.http.get<AcademicTitleDto[]>(
      '/v1/academic-titles',
    );

    return data;
  }

  async addAcademicTitle(params: AddAcademicTitleParams) {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.put<LecturerDto>(
      `/v1/lecturers/${params.lecturerId}/academic-titles/${params.academicTitleId}`,
    );

    return dtoMapper.toEntity(data);
  }

  async deleteAcademicTitle(params: DeleteAcademicTitleParams) {
    const dtoMapper = new LecturerDtoMapper();

    const { data } = await this.http.delete(
      `/v1/lecturers/${params.lecturerId}/academic-titles/${params.academicTitleId}`,
    );

    return dtoMapper.toEntity(data);
  }
}

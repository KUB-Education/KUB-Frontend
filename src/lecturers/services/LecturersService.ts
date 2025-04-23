import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  academicTitles,
  AddLecturerParams,
  EditLecturerParams,
  Lecturer,
  LecturerId,
  lecturerPositions,
  lecturerStatuses,
} from '@/lecturers/entities';
import { delay, SECOND } from '@/common/utils';
import { DepartmentsService } from '@/departments/services';
import { Department } from '@/departments/entities';
import { UserStatus, userStatuses } from '@/users/entities';
import { HttpClient } from '@/common/http-client';

export class LecturersService extends BaseService {
  private lecturers: Lecturer[] = [];

  constructor(
    httpClient: HttpClient,
    private readonly departmentsService: DepartmentsService,
  ) {
    super(httpClient);
  }

  async getLecturers(): Promise<Lecturer[]> {
    const array = new Array(5).fill(null);

    if (this.lecturers.length) return this.lecturers;

    this.lecturers = await Promise.all(
      array.map(async () => ({
        id: faker.number.int(),
        academicTitle: faker.helpers.arrayElement(academicTitles),
        department: (await this.departmentsService.getDepartment(
          faker.number.int({ min: 0, max: 9 }),
        )) as Department,
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        position: faker.helpers.arrayElement(lecturerPositions),
        status: faker.helpers.arrayElement(lecturerStatuses),
        userStatus: faker.helpers.arrayElement(userStatuses),
      })),
    );

    return this.lecturers;
  }

  async addLecturer(params: AddLecturerParams) {
    await delay(5 * SECOND);

    const department = await this.departmentsService.getDepartment(
      params.departmentId,
    );

    if (!department) return;

    this.lecturers.push({
      ...params,
      department,
      id: faker.number.int(),
      userStatus: faker.helpers.arrayElement(userStatuses),
    });
  }

  async deleteLecturers(ids: Array<LecturerId>) {
    await delay(2 * SECOND);
    this.lecturers = this.lecturers.filter(
      (lecturer) => !ids.includes(lecturer.id),
    );
  }

  async resendInvites(ids: Array<LecturerId>) {
    await delay(2 * SECOND);
    this.lecturers = this.lecturers.map((lecturer) => {
      if (ids.includes(lecturer.id)) {
        return { ...lecturer, userStatus: UserStatus.ACTIVATION_PENDING };
      }

      return lecturer;
    });
  }

  async editLecturer(params: EditLecturerParams) {
    await delay(5 * SECOND);

    const updatedDepartment = params.departmentId
      ? await this.departmentsService.getDepartment(params.departmentId)
      : null;

    this.lecturers = this.lecturers.map((lecturer) => {
      if (lecturer.id !== params.id) return lecturer;

      return {
        ...lecturer,
        ...params,
        department: updatedDepartment ? updatedDepartment : lecturer.department,
      };
    });
  }
}

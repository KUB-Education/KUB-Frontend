import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  AcademicTitle,
  AcademicTitleId,
  AcademicTitleName,
  academicTitleNames,
  AddLecturerParams,
  AddLecturerToDepartmentParams,
  EditLecturerParams,
  Lecturer,
  LecturerId,
  lecturerPositions,
  LecturerStatus,
  lecturerStatuses,
  EditLecturerDepartmentParams,
} from '@/lecturers/entities';
import { delay, SECOND } from '@/common/utils';
import { UserStatus, userStatuses } from '@/users/entities';
import { HttpClient } from '@/common/http-client';

export class LecturersService extends BaseService {
  private academicTitlesMap: Record<AcademicTitleId, AcademicTitle>;
  private lecturers: Lecturer[] = [];

  constructor(httpClient: HttpClient) {
    super(httpClient);

    this.academicTitlesMap = academicTitleNames.reduce(
      (acc, name) => {
        const id = faker.number.int();
        return { ...acc, [id]: { id, name } };
      },
      {} as Record<AcademicTitleName, AcademicTitle>,
    );
  }

  async getAcademicTitles(): Promise<AcademicTitle[]> {
    return Object.values(this.academicTitlesMap);
  }

  async getLecturers(): Promise<Lecturer[]> {
    if (this.lecturers.length) return this.lecturers;

    const arr = new Array(5).fill(null);

    this.lecturers = arr.map(() => ({
      id: faker.number.int(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      userStatus: faker.helpers.arrayElement(userStatuses),
      academicTitles: faker.helpers.arrayElements(
        Object.values(this.academicTitlesMap),
        { max: 3, min: 1 },
      ),
      departments: [
        {
          id: faker.number.int(),
          name: faker.person.jobArea(),
          position: faker.helpers.arrayElement(lecturerPositions),
          status: faker.helpers.arrayElement(lecturerStatuses),
        },
      ],
      roles: [],
    }));

    return this.lecturers;
  }

  async addLecturer(params: AddLecturerParams) {
    await delay(5 * SECOND);

    this.lecturers.push({
      id: faker.number.int(),
      ...params,
      academicTitles: [],
      departments: [],
      userStatus: UserStatus.ACTIVATION_PENDING,
      roles: [],
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

  async addLecturerToDepartment(params: AddLecturerToDepartmentParams) {
    await delay(2 * SECOND);

    this.lecturers = this.lecturers.map((lecturer) => {
      if (lecturer.id !== params.lecturerId) return lecturer;

      return {
        ...lecturer,
        departments: [
          ...lecturer.departments,
          { ...params, status: LecturerStatus.ACTIVE },
        ],
      };
    });
  }

  async editLecturerDepartment(params: EditLecturerDepartmentParams) {
    await delay(2 * SECOND);

    this.lecturers = this.lecturers.map((lecturer) => {
      if (lecturer.id !== params.lecturerId) return lecturer;

      const departments = lecturer.departments.map((department) => {
        if (department.id !== params.id) return department;

        return { ...department, ...params };
      });

      return {
        ...lecturer,
        departments,
      };
    });
  }

  async editLecturer(params: EditLecturerParams) {
    await delay(5 * SECOND);

    this.lecturers = this.lecturers.map((lecturer) => {
      if (lecturer.id !== params.id) return lecturer;

      return {
        ...lecturer,
        ...params,
        academicTitles: params.academicTitles
          ? params.academicTitles.map(
              (titleId) => this.academicTitlesMap[titleId],
            )
          : lecturer.academicTitles,
        departments: params.departments
          ? params.departments
          : lecturer.departments,
      };
    });
  }
}

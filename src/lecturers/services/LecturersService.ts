import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  AddLecturerParams,
  EditLecturerParams,
  Lecturer,
  LecturerId,
} from '@/lecturers/entities';
import { delay, SECOND } from '@/common/utils';

export class LecturersService extends BaseService {
  private lecturers: Lecturer[] = [];

  constructor() {
    super();

    const array = new Array(5).fill(null);

    this.lecturers = array.map(() => ({
      id: faker.number.int(),
      academicTitle: faker.person.jobType(),
      department: faker.person.jobArea(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      position: faker.person.jobTitle(),
      status: faker.string.sample(),
      userStatus: faker.string.sample(),
    }));
  }

  async getLecturers(): Promise<Lecturer[]> {
    return this.lecturers;
  }

  async addLecturer(params: AddLecturerParams) {
    await delay(5 * SECOND);
    this.lecturers.push({
      ...params,
      id: faker.number.int(),
      userStatus: faker.string.sample(),
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
        return { ...lecturer, userStatus: faker.string.sample() };
      }

      return lecturer;
    });
  }

  async editLecturer(params: EditLecturerParams) {
    await delay(5 * SECOND);
    this.lecturers = this.lecturers.map((lecturer) => {
      if (lecturer.id !== params.id) return lecturer;

      return { ...lecturer, ...params };
    });
  }
}

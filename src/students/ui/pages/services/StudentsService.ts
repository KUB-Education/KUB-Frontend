import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  AddStudentParams,
  EditStudentParams,
  Student,
  StudentId,
} from '@/students/ui/pages/entities'; //students/entities
import { delay, SECOND } from '@/common/utils';
//import { DepartmentsService } from '@/departments/services';
import { UserStatus, userStatuses } from '@/users/entities';

export class StudentsService extends BaseService {
  private students: Student[] = [];

  constructor() {
    super();
  }

  async getStudents(): Promise<Student[]> {
    const array = new Array(5).fill(null);

    if (this.students.length) return this.students;

    this.students = await Promise.all(
      array.map(async () => ({
        id: faker.number.int(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        userStatus: faker.helpers.arrayElement(userStatuses),
      })),
    );

    return this.students;
  }

  async addStudent(params: AddStudentParams) {
    await delay(5 * SECOND);

    this.students.push({
      ...params,
      id: faker.number.int(),
      userStatus: faker.helpers.arrayElement(userStatuses),
    });
  }

  async deleteStudents(ids: Array<StudentId>) {
    await delay(2 * SECOND);
    this.students = this.students.filter(
      (student) => !ids.includes(student.id),
    );
  }

  async resendInvites(ids: Array<StudentId>) {
    await delay(2 * SECOND);
    this.students = this.students.map((student) => {
      if (ids.includes(student.id)) {
        return { ...student, userStatus: UserStatus.ACTIVATION_PENDING };
      }

      return student;
    });
  }

  async editStudent(params: EditStudentParams) {
    await delay(5 * SECOND);

    this.students = this.students.map((student) => {
      if (student.id !== params.id) return student;

      return {
        ...student,
        ...params,
      };
    });
  }
}

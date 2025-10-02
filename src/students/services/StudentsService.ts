import { BaseService } from '@/common/services';
import { UserRole, userStatuses } from '@/users/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import { Student } from '@/students/entities';

export class StudentsService extends BaseService {
  private students: Student[] = [];

  async getStudents(): Promise<Student[]> {
    await delay(2 * SECOND);
    const array = new Array(5).fill(null);

    if (this.students.length) return this.students;

    this.students = array.map(() => ({
      id: faker.number.int(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      userStatus: faker.helpers.arrayElement(userStatuses),
      roles: [
        {
          id: faker.number.int(),
          name: faker.helpers.arrayElement(Object.values(UserRole)),
        },
      ],
    }));

    return this.students;
  }
}

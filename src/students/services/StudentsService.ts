import { BaseService } from '@/common/services';
import { UserRole, UserStatus, userStatuses } from '@/users/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import {
  Student,
  AddStudentParams,
  EditStudentParams,
  StudentId,
} from '@/students/entities';
import { academicDegrees, studyFormats } from '@/educational-programs/entities';

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
      educationalPrograms: [
        {
          id: faker.number.int(),
          studyField: {
            id: faker.number.int({ min: 1, max: 50 }),
            code: `SF${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
            name: faker.word.words({ count: 2 }),
          },
          specialty: {
            id: faker.number.int({ min: 1, max: 50 }),
            code: `SP${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
            name: faker.word.words({ count: 2 }),
          },
          educationalProgram: {
            id: faker.number.int({ min: 1, max: 100 }),
            name: faker.word.words({ count: 3 }),
            degreeType: faker.helpers.arrayElement(academicDegrees),
            studyFormat: faker.helpers.arrayElement(studyFormats),
          },
        },
      ],
      groups: [
        {
          id: faker.number.int(),
          name: faker.person.jobTitle(),
          createdAt: faker.date.past().getTime(),
        },
      ],
    }));

    return this.students;
  }

  async addStudent(params: AddStudentParams) {
    await delay(2 * SECOND);

    this.students.push({
      id: faker.number.int(),
      ...params,
      userStatus: faker.helpers.arrayElement(userStatuses),
      roles: [
        {
          id: faker.number.int(),
          name: faker.helpers.arrayElement(Object.values(UserRole)),
        },
      ],
      educationalPrograms: [],
      groups: [],
    });
  }

  async editStudent(params: EditStudentParams) {
    await delay(2 * SECOND);

    this.students = this.students.map((student) => {
      if (student.id !== student.id) return student;
      const updatedStudent = {
        ...student,
        lastName: params.lastName ? params.lastName : student.lastName,
        firstName: params.firstName ? params.firstName : student.firstName,
        middleName: params.middleName ? params.middleName : student.middleName,
        email: params.email ? params.email : student.email,
      };

      updatedStudent.groups = params.groups
        ? params.groups.map((groupId) => ({
            id: groupId,
            name: faker.person.jobTitle(),
            createdAt: faker.date.past().getTime(),
          }))
        : student.groups;

      updatedStudent.educationalPrograms = params.educationalPrograms
        ? params.educationalPrograms.map((educationalProgramId) => ({
            id: educationalProgramId,
            studyField: {
              id: faker.number.int({ min: 1, max: 50 }),
              code: `SF${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
              name: faker.word.words({ count: 2 }),
            },
            specialty: {
              id: faker.number.int({ min: 1, max: 50 }),
              code: `SP${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
              name: faker.word.words({ count: 2 }),
            },
            educationalProgram: {
              id: faker.number.int({ min: 1, max: 100 }),
              name: faker.word.words({ count: 3 }),
              degreeType: faker.helpers.arrayElement(academicDegrees),
              studyFormat: faker.helpers.arrayElement(studyFormats),
            },
          }))
        : student.educationalPrograms;

      return updatedStudent;
    });
  }

  async deleteStudents(ids: Array<StudentId>) {
    await delay(2 * SECOND);
    this.students = this.students.filter(
      (student) => !ids.includes(student.id),
    );
  }

  async resendStudentsActivationEmail(ids: Array<StudentId>) {
    await delay(2 * SECOND);
    this.students = this.students.map((student) => {
      if (!ids.includes(student.id)) return student;

      return { ...student, userStatus: UserStatus.ACTIVATION_PENDING };
    });
  }
}

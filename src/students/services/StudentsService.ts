import { BaseService } from '@/common/services';
import { UserRoleType, UserStatus, userStatuses } from '@/users/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import {
  Student,
  AddStudentParams,
  EditStudentParams,
  StudentId,
} from '@/students/entities';
import { degreeTypes, studyForms } from '@/educational-programs/entities';
import { HttpClient } from '@/common/http-client';
import { EducationalProgramsService } from '@/educational-programs/services';
import { SpecialitiesService } from '@/specialities/services';

export class StudentsService extends BaseService {
  private students: Student[] = [];

  constructor(
    http: HttpClient,
    private readonly specialitiesService: SpecialitiesService,
    private readonly educationalProgramsService: EducationalProgramsService,
  ) {
    super(http);
  }

  async getStudents(): Promise<Student[]> {
    await delay(2 * SECOND);
    const array = new Array(5).fill(null);

    if (this.students.length) return this.students;

    const specialities = await this.specialitiesService.getSpecialities();

    const specialityIds = specialities.map((speciality) => speciality.id);
    const specialityId = faker.helpers.arrayElement(specialityIds);

    const educationalPrograms =
      await this.educationalProgramsService.getSpecialityEducationalPrograms(
        specialityId,
      );

    const educationalProgramIds = educationalPrograms.map(
      (educationalProgram) => educationalProgram.id,
    );

    this.students = array.map(() => ({
      id: faker.number.int(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      status: faker.helpers.arrayElement(userStatuses),
      roles: [
        {
          id: faker.number.int(),
          type: faker.helpers.arrayElement(Object.values(UserRoleType)),
        },
      ],
      educationalPrograms: [
        {
          id: faker.helpers.arrayElement(educationalProgramIds),
          studyForm: faker.helpers.arrayElement(studyForms),
          name: faker.word.noun(),
          degreeType: faker.helpers.arrayElement(degreeTypes),
          specialityId,
          duration: faker.number.int({ min: 1, max: 100 }),
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
      status: faker.helpers.arrayElement(userStatuses),
      roles: [
        {
          id: faker.number.int(),
          type: faker.helpers.arrayElement(Object.values(UserRoleType)),
        },
      ],
      educationalPrograms: [],
      groups: [],
    });
  }

  async editStudent(params: EditStudentParams) {
    await delay(2 * SECOND);

    const educationalPrograms =
      await this.educationalProgramsService.getEducationalPrograms();

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
        ? educationalPrograms.filter((educationalProgram) => {
            return params.educationalPrograms?.includes(educationalProgram.id);
          })
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

import { BaseService } from '@/common/services';
import { UserRoleType, UserStatus, userStatuses } from '@/users/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import {
  AddStudentEducationalProgramParams,
  AddStudentParams,
  DeleteStudentEducationalProgramParams,
  EditStudentEducationalProgramParams,
  EditStudentParams,
  Student,
  StudentEducationalProgramStatus,
  studentEducationalProgramStatuses,
  studentEducationalProgramTuitions,
  StudentId,
} from '@/students/entities';
import { HttpClient } from '@/common/http-client';
import { EducationalProgramsService } from '@/educational-programs/services';
import { SpecialitiesService } from '@/specialities/services';

export class StudentsService extends BaseService {
  private students: Record<StudentId, Student> = {};

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

    if (Object.values(this.students).length)
      return Object.values(this.students);

    const specialities = await this.specialitiesService.getSpecialities();

    const specialityIds = specialities.map((speciality) => speciality.id);
    const specialityId = faker.helpers.arrayElement(specialityIds);

    const educationalPrograms =
      await this.educationalProgramsService.getSpecialityEducationalPrograms(
        specialityId,
      );

    this.students = array.reduce((acc: Record<StudentId, Student>) => {
      const educationalProgram =
        faker.helpers.arrayElement(educationalPrograms);

      const id = faker.number.int();

      return {
        ...acc,
        [id]: {
          id,
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
              id: faker.number.int(),
              educationalProgram,
              startDate: faker.date.past().getTime(),
              endDate: faker.date.soon().getTime(),
              status: faker.helpers.arrayElement(
                studentEducationalProgramStatuses,
              ),
              tuition: faker.helpers.arrayElement(
                studentEducationalProgramTuitions,
              ),
            },
          ],
          groups: [
            {
              id: faker.number.int(),
              name: faker.person.jobTitle(),
              createdAt: faker.date.past().getTime(),
            },
          ],
        },
      };
    }, {});

    return Object.values(this.students);
  }

  async addStudent(params: AddStudentParams) {
    await delay(2 * SECOND);

    const id = faker.number.int();

    this.students[id] = {
      id,
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
    };
  }

  async editStudent(params: EditStudentParams) {
    await delay(2 * SECOND);

    const student = this.students[params.id];

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

    this.students[updatedStudent.id] = updatedStudent;
  }

  async deleteStudents(ids: Array<StudentId>) {
    await delay(2 * SECOND);

    ids.forEach((id) => {
      delete this.students[id];
    });
  }

  async resendStudentsActivationEmail(ids: Array<StudentId>) {
    await delay(2 * SECOND);
    ids.forEach((id) => {
      this.students[id] = {
        ...this.students[id],
        status: UserStatus.ACTIVATION_PENDING,
      };
    });
  }

  async addStudentEducationalProgram(
    params: AddStudentEducationalProgramParams,
  ) {
    const educationalPrograms =
      await this.educationalProgramsService.getEducationalPrograms();

    const educationalProgram = educationalPrograms.find(
      (program) => program.id === params.educationalProgramId,
    );

    if (!educationalProgram) {
      throw Error('Program not found');
    }

    this.students[params.studentId] = {
      ...this.students[params.studentId],
      educationalPrograms: [
        ...this.students[params.studentId].educationalPrograms,
        {
          id: faker.number.int(),
          educationalProgram,
          status: StudentEducationalProgramStatus.ACTIVE,
          tuition: params.tuition,
          startDate: params.startDate,
          endDate: faker.date.soon({ refDate: params.startDate }).getTime(),
        },
      ],
    };
  }

  async editStudentEducationalProgram(
    params: EditStudentEducationalProgramParams,
  ) {
    await delay(2 * SECOND);

    this.students[params.studentId].educationalPrograms = this.students[
      params.studentId
    ].educationalPrograms.map((studentEduProgram) => {
      if (studentEduProgram.id !== params.studentEducationalProgramId)
        return studentEduProgram;

      return {
        ...studentEduProgram,
        ...params,
      };
    });
  }

  async deleteStudentEducationalProgram(
    params: DeleteStudentEducationalProgramParams,
  ) {
    await delay(2 * SECOND);

    this.students[params.studentId].educationalPrograms = this.students[
      params.studentId
    ].educationalPrograms.filter(
      (studentEduProgram) =>
        studentEduProgram.id !== params.studentEducationalProgramId,
    );
  }
}

import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import {
  EducationalProgram,
  AddEducationalProgramParams,
  EditEducationalProgramParams,
  EducationalProgramId,
  academicDegrees,
  studyFormats,
} from '@/educational-programs/entities';
import { delay, SECOND } from '@/common/utils';
import { HttpClient } from '@/common/http-client';

export class EducationalProgramsService extends BaseService {
  private educationalPrograms: EducationalProgram[] = [];

  constructor(http: HttpClient) {
    super(http);

    for (let i = 0; i < 1; i++) {
      const studyField = {
        id: faker.number.int({ min: 1, max: 50 }),
        code: `SF${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
        name: faker.word.words({ count: 2 }),
      };

      for (let j = 0; j < 2; j++) {
        const specialty = {
          id: faker.number.int({ min: 1, max: 50 }),
          code: `SP${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
          name: faker.word.words({ count: 2 }),
        };

        for (let k = 0; k < 2; k++) {
          const educationalProgram = {
            id: faker.number.int({ min: 1, max: 100 }),
            name: faker.word.words({ count: 3 }),
            degreeType: faker.helpers.arrayElement(academicDegrees),
            studyFormat: faker.helpers.arrayElement(studyFormats),
          };

          this.educationalPrograms.push({
            id: faker.number.int({ min: 1, max: 100 }),
            studyField: studyField,
            specialty: specialty,
            educationalProgram: educationalProgram,
          });
        }
      }
    }
  }

  async getEducationalPrograms(): Promise<EducationalProgram[]> {
    return this.educationalPrograms;
  }

  async addEducationalProgram(params: AddEducationalProgramParams) {
    await delay(1 * SECOND);
    this.educationalPrograms.push({
      id: faker.number.int(),
      studyField: {
        ...params.studyField,
        id:
          this.educationalPrograms.find(
            (ep) => ep.studyField.code == params.studyField.code,
          )?.studyField.id ?? faker.number.int(),
      },
      specialty: {
        ...params.specialty,
        id:
          this.educationalPrograms.find(
            (ep) => ep.specialty.code == params.specialty.code,
          )?.specialty.id ?? faker.number.int(),
      },
      educationalProgram: {
        ...params.educationalProgram,
        id: faker.number.int(),
      },
    });
  }

  async deleteEducationalPrograms(ids: Array<EducationalProgramId>) {
    await delay(1 * SECOND);
    this.educationalPrograms = this.educationalPrograms.filter(
      (ep) => !ids.includes(ep.id),
    );
  }

  async editEducationalProgram(params: EditEducationalProgramParams) {
    await delay(1 * SECOND);
    this.educationalPrograms = this.educationalPrograms.map((ep) => {
      if (ep.id !== params.id) return ep;

      return {
        id: ep.id,
        studyField: {
          ...ep.studyField,
          ...params.studyField,
          id:
            this.educationalPrograms.find(
              (ep) => ep.studyField.code == params.studyField.code,
            )?.studyField.id ?? faker.number.int(),
        },
        specialty: {
          ...ep.specialty,
          ...params.specialty,
          id:
            this.educationalPrograms.find(
              (ep) => ep.specialty.code == params.specialty.code,
            )?.specialty.id ?? faker.number.int(),
        },
        educationalProgram: {
          ...ep.educationalProgram,
          ...params.educationalProgram,
        },
      };
    });
  }
}

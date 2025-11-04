import { BaseService } from '@/common/services';
import {
  AddStudyFieldParams,
  EditStudyFieldParams,
  StudyField,
  StudyFieldId,
} from '@/study-fields/entities';
import { faker } from '@faker-js/faker';
import { delay, SECOND } from '@/common/utils';

export class StudyFieldsService extends BaseService {
  private studyFields: Record<StudyFieldId, StudyField> = {};

  async getStudyFields(): Promise<StudyField[]> {
    await delay(2 * SECOND);

    if (Object.keys(this.studyFields).length) {
      return Object.values(this.studyFields);
    }

    const arr = new Array(5).fill(null);

    this.studyFields = arr.reduce(
      (acc) => {
        const id = faker.number.int();
        return {
          ...acc,
          [id]: {
            id,
            name: faker.person.jobType(),
            code: faker.string.numeric(),
          },
        };
      },
      {} as Record<StudyFieldId, StudyField>,
    );

    return Object.values(this.studyFields);
  }

  async addStudyField(params: AddStudyFieldParams): Promise<StudyField> {
    await delay(2 * SECOND);

    const studyField = {
      id: faker.number.int(),
      name: params.name,
      code: params.code,
    };

    this.studyFields[studyField.id] = studyField;

    return this.studyFields[studyField.id];
  }

  async editStudyField(params: EditStudyFieldParams): Promise<StudyField> {
    await delay(2 * SECOND);

    this.studyFields[params.id] = {
      ...this.studyFields[params.id],
      ...params,
    };

    return this.studyFields[params.id];
  }

  async deleteStudyFields(ids: Array<StudyFieldId>): Promise<void> {
    await delay(2 * SECOND);

    ids.forEach((id) => {
      delete this.studyFields[id];
    });
  }
}

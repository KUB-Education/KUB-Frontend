import { BaseService } from '@/common/services';
import {
  AddSpecialityParams,
  EditSpecialityParams,
  Speciality,
  SpecialityId,
} from '@/specialities/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';
import { StudyFieldsService } from '@/study-fields/services';
import { HttpClient } from '@/common/http-client';

export class SpecialitiesService extends BaseService {
  private specialities: Record<SpecialityId, Speciality> = {};

  constructor(
    httpClient: HttpClient,
    private readonly studyFieldsService: StudyFieldsService,
  ) {
    super(httpClient);
  }

  async getSpecialities(): Promise<Speciality[]> {
    const studyFields = await this.studyFieldsService.getStudyFields();

    const studyFieldIds = studyFields.map((s) => s.id);

    if (Object.keys(this.specialities).length) {
      return Object.values(this.specialities);
    }

    const arr = new Array(25).fill(null);

    this.specialities = arr.reduce((acc) => {
      const id = faker.number.int({ min: 0, max: 10000 });

      return {
        ...acc,
        [id]: {
          id,
          studyFieldId: faker.helpers.arrayElement(studyFieldIds),
          name: faker.string.sample(),
          code: faker.string.alphanumeric(),
        },
      };
    }, {});

    return Object.values(this.specialities);
  }

  async addSpeciality(params: AddSpecialityParams): Promise<Speciality> {
    await delay(2 * SECOND);

    const speciality = {
      id: faker.number.int(),
      studyFieldId: params.studyFieldId,
      name: params.name,
      code: params.code,
    };

    this.specialities[speciality.id] = speciality;

    return this.specialities[speciality.id];
  }

  async editSpeciality(params: EditSpecialityParams): Promise<Speciality> {
    await delay(2 * SECOND);

    this.specialities[params.id] = {
      ...this.specialities[params.id],
      ...params,
    };

    return this.specialities[params.id];
  }

  async deleteSpecialities(ids: Array<SpecialityId>): Promise<void> {
    await delay(2 * SECOND);

    ids.forEach((id) => {
      delete this.specialities[id];
    });
  }
}

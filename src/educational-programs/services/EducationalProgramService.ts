import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import { delay, SECOND } from '@/common/utils';
import { HttpClient } from '@/common/http-client';
import {
  AddSpecialityEducationalProgram,
  DegreeType,
  EducationalProgram,
  EducationalProgramId,
  StudyForm,
  EditEducationalProgramParams,
} from '@/educational-programs/entities';
import { SpecialitiesService } from '@/specialities/services';
import { SpecialityId } from '@/specialities/entities';

export class EducationalProgramsService extends BaseService {
  private educationalPrograms: Record<
    EducationalProgramId,
    EducationalProgram
  > = {};

  constructor(
    httpClient: HttpClient,
    private readonly specialitiesService: SpecialitiesService,
  ) {
    super(httpClient);
  }

  async getEducationalPrograms(): Promise<EducationalProgram[]> {
    const specialities = await this.specialitiesService.getSpecialities();

    const specialityIds = specialities.map((s) => s.id);

    if (Object.keys(this.educationalPrograms).length) {
      return Object.values(this.educationalPrograms);
    }

    const arr = new Array(200).fill(null);

    this.educationalPrograms = arr.reduce((acc) => {
      const id = faker.number.int();
      const educationalProgram: EducationalProgram = {
        id,
        specialityId: faker.helpers.arrayElement(specialityIds),
        name: faker.string.sample(),
        degreeType: faker.helpers.arrayElement(Object.values(DegreeType)),
        studyForm: faker.helpers.arrayElement(Object.values(StudyForm)),
        duration: faker.number.int({ min: 1, max: 100 }),
      };

      return { ...acc, [id]: educationalProgram };
    }, {});

    return Object.values(this.educationalPrograms);
  }

  async getSpecialityEducationalPrograms(specialityId: SpecialityId) {
    const educationalPrograms = await this.getEducationalPrograms();

    return educationalPrograms.filter(
      (educationalProgram) => educationalProgram.specialityId === specialityId,
    );
  }

  async addSpecialityEducationalProgram(
    params: AddSpecialityEducationalProgram,
  ): Promise<EducationalProgram> {
    await delay(2 * SECOND);

    const educationalProgram: EducationalProgram = {
      id: faker.number.int(),
      ...params,
    };

    this.educationalPrograms[educationalProgram.id] = educationalProgram;

    return this.educationalPrograms[educationalProgram.id];
  }

  async editEducationalProgram(
    params: EditEducationalProgramParams,
  ): Promise<EducationalProgram> {
    await delay(2 * SECOND);

    this.educationalPrograms[params.id] = {
      ...this.educationalPrograms[params.id],
      ...params,
    };

    return this.educationalPrograms[params.id];
  }

  async deleteEducationalPrograms(
    ids: Array<EducationalProgramId>,
  ): Promise<void> {
    await delay(2 * SECOND);

    ids.forEach((id) => {
      delete this.educationalPrograms[id];
    });
  }
}

import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import { GrouppedData, HierarchyData } from '@/common/entities';
import {
  EducationalProgram,
  HierarchyEducationalPrograms,
  academicDegrees,
  studyFormats,
  StudyField,
  Specialty,
} from '@/educational-programs/entities';
import { delay, SECOND } from '@/common/utils';
import { HttpClient } from '@/common/http-client';

type HierarchyEducationalProgram = HierarchyData<
  StudyField,
  Specialty,
  EducationalProgram
>;
type GrouppedEducationalProgram = GrouppedData<
  StudyField,
  Specialty,
  EducationalProgram
>;

export class EducationalProgramsService extends BaseService {
  private educationalPrograms: HierarchyEducationalPrograms[] = [];

  constructor(http: HttpClient) {
    super(http);

    this.educationalPrograms = new Array(5).fill(null).map(() => ({
      studyField: {
        id: faker.number.int({ min: 1, max: 500 }),
        code: `SF${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
        name: faker.word.words({ count: 2 }),
      },
      specialties: new Array(5).fill(null).map(() => ({
        specialty: {
          id: faker.number.int({ min: 1, max: 500 }),
          code: `SP${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
          name: faker.word.words({ count: 2 }),
        },
        educationalPrograms: new Array(5).fill(null).map(() => ({
          id: faker.number.int({ min: 1, max: 500 }),
          name: faker.word.words({ count: 3 }),
          degreeType: faker.helpers.arrayElement(academicDegrees),
          studyFormat: faker.helpers.arrayElement(studyFormats),
        })),
      })),
    }));
  }

  async getEducationalPrograms(): Promise<HierarchyEducationalProgram[]> {
    return this.convertHierarchyFrom(this.educationalPrograms);
  }

  async addEducationalProgram(data: GrouppedEducationalProgram) {
    await delay(1 * SECOND);

    const item = this.convertGrouppedTo(data);
    const { studyField, specialty } = this.getParams(item);

    if (specialty && item.educationalProgram) {
      specialty.educationalPrograms.push({
        ...item.educationalProgram,
        id: faker.number.int({ min: 1, max: 500 }),
      });
    } else if (studyField && item.specialty) {
      studyField.specialties.push({
        specialty: {
          ...item.specialty,
          id: faker.number.int({ min: 1, max: 500 }),
        },
        educationalPrograms: [],
      });
    } else if (item.studyField) {
      this.educationalPrograms.push({
        studyField: {
          ...item.studyField,
          id: faker.number.int({ min: 1, max: 500 }),
        },
        specialties: [],
      });
    }
  }

  async editEducationalProgram(data: GrouppedEducationalProgram) {
    await delay(1 * SECOND);

    const item = this.convertGrouppedTo(data);
    const { studyField, specialty, educationalProgramIndex } =
      this.getParams(item);

    if (educationalProgramIndex >= 0) {
      specialty!.educationalPrograms[educationalProgramIndex] = {
        ...item.educationalProgram!,
      };
    } else if (specialty) {
      specialty.specialty = { ...item.specialty! };
    } else if (studyField) {
      studyField.studyField = { ...item.studyField! };
    }
  }

  async deleteEducationalPrograms(data: Array<GrouppedEducationalProgram>) {
    await delay(1 * SECOND);

    const items = data.map((d) => this.convertGrouppedTo(d));

    const shouldRemoveStudyField = (studyFieldId: number) =>
      items.some(
        (item) => !item.specialty && item.studyField?.id === studyFieldId,
      );

    const shouldRemoveSpecialty = (specialtyId?: number) =>
      items.some(
        (item) =>
          !item.educationalProgram && item.specialty?.id === specialtyId,
      );

    const shouldRemoveEducationalProgram = (programId?: number) =>
      items.some((item) => item.educationalProgram?.id === programId);

    const filteredPrograms: HierarchyEducationalPrograms[] =
      this.educationalPrograms
        .filter((group) => !shouldRemoveStudyField(group.studyField!.id))
        .map((group) => ({
          studyField: group.studyField,
          specialties: group.specialties
            .filter((spec) => !shouldRemoveSpecialty(spec.specialty?.id))
            .map((spec) => ({
              specialty: spec.specialty,
              educationalPrograms: spec.educationalPrograms.filter(
                (program) => !shouldRemoveEducationalProgram(program?.id),
              ),
            })),
        }));

    this.educationalPrograms = filteredPrograms;
  }

  getParams(
    params: Partial<{
      studyField: StudyField;
      specialty: Specialty;
      educationalProgram: EducationalProgram;
    }>,
  ) {
    const studyField = this.educationalPrograms.find(
      (ep) => ep.studyField?.id == params.studyField?.id,
    );
    const specialty = studyField?.specialties.find(
      (s) => s.specialty?.id == params.specialty?.id,
    );
    const educationalProgramIndex =
      specialty?.educationalPrograms.findIndex(
        (ep) => ep?.id === params.educationalProgram?.id,
      ) ?? -1;

    return {
      studyField,
      specialty,
      educationalProgramIndex,
    };
  }

  convertHierarchyFrom(
    educationalPrograms: HierarchyEducationalPrograms[],
  ): HierarchyEducationalProgram[] {
    return educationalPrograms.map((p) => ({
      data1Value: p.studyField,
      data2: p.specialties.map((s) => ({
        data2Value: s.specialty,
        data3: s.educationalPrograms,
      })),
    }));
  }

  convertGrouppedTo(educationalProgram: GrouppedEducationalProgram) {
    return {
      studyField: educationalProgram.data1,
      specialty: educationalProgram.data2,
      educationalProgram: educationalProgram.data3,
    };
  }
}

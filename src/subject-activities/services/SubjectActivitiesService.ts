import { BaseService } from '@/common/services';
import { SubjectId } from '@/subjects/entities';
import {
  AddSubjectActivityParams,
  DeleteSubjectActivitiesParams,
  EditSubjectActivityParams,
  SubjectActivity,
  SubjectActivityId,
  SubjectActivityType,
} from '@/subject-activities/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';

export class SubjectActivitiesService extends BaseService {
  private subjectActivities: Record<
    SubjectId,
    Record<SubjectActivityId, SubjectActivity>
  > = {};

  async getSubjectActivities(subjectId: SubjectId): Promise<SubjectActivity[]> {
    await delay(2 * SECOND);
    const subjectActivities = this.subjectActivities[subjectId];

    if (subjectActivities && Object.keys(subjectActivities).length) {
      return Object.values(subjectActivities);
    }

    const arr = new Array(5).fill(null);

    this.subjectActivities[subjectId] = arr.reduce(
      (acc: Record<SubjectActivityId, SubjectActivity>) => {
        const id = faker.number.int();
        return {
          ...acc,
          [id]: {
            id,
            subjectId: subjectId,
            type: faker.helpers.arrayElement(
              Object.values(SubjectActivityType),
            ),
            academicHours: faker.number.int({ min: 1, max: 300 }),
          },
        };
      },
      {},
    );

    return Object.values(this.subjectActivities[subjectId]);
  }

  async addSubjectActivity(
    params: AddSubjectActivityParams,
  ): Promise<SubjectActivity> {
    await delay(2 * SECOND);

    const termSubjects = this.subjectActivities[params.subjectId];

    const subjectActivity: SubjectActivity = {
      id: faker.number.int(),
      subjectId: params.subjectId,
      academicHours: params.academicHours,
      type: params.type,
    };

    if (!termSubjects) {
      this.subjectActivities[params.subjectId] = {
        [subjectActivity.id]: subjectActivity,
      };
      return subjectActivity;
    }

    this.subjectActivities[params.subjectId] = {
      ...this.subjectActivities[params.subjectId],
      [subjectActivity.id]: subjectActivity,
    };

    return subjectActivity;
  }

  async editSubjectActivity(
    params: EditSubjectActivityParams,
  ): Promise<SubjectActivity> {
    await delay(2 * SECOND);

    const subjectsActivities = this.subjectActivities[params.subjectId];

    if (!subjectsActivities) {
      throw Error(`Could not edit subject activity: ${params.subjectId}`);
    }

    const subjectActivity = subjectsActivities[params.subjectActivityId];

    if (!subjectActivity) {
      throw Error(`Could not edit subject activity: ${params.subjectId}`);
    }

    subjectsActivities[params.subjectActivityId] = {
      ...subjectsActivities[params.subjectActivityId],
      ...params,
    };

    return subjectsActivities[params.subjectActivityId];
  }

  async deleteSubjectActivities(
    params: DeleteSubjectActivitiesParams,
  ): Promise<void> {
    await delay(2 * SECOND);

    const subjectActivities = this.subjectActivities[params.subjectId];

    if (!subjectActivities) {
      throw Error(`Could not edit subject activity: ${params.subjectId}`);
    }

    params.subjectActivityIds.forEach((id) => {
      delete subjectActivities[id];
    });
  }
}

import { BaseService } from '@/common/services';
import { TermId } from '@/terms/entities';
import {
  AddSubjectParams,
  DeleteSubjectsParams,
  EditSubjectParams,
  Subject,
  SubjectId,
  SubjectType,
} from '@/subjects/entities';
import { delay, SECOND } from '@/common/utils';
import { faker } from '@faker-js/faker';

export class SubjectService extends BaseService {
  private subjects: Record<TermId, Record<SubjectId, Subject>> = {};

  async getSubjectsByTerm(termId: TermId): Promise<Subject[]> {
    await delay(2 * SECOND);
    const termSubjects = this.subjects[termId];

    if (termSubjects && Object.keys(termSubjects).length) {
      return Object.values(termSubjects);
    }

    const arr = new Array(5).fill(null);

    this.subjects[termId] = arr.reduce((acc: Record<SubjectId, Subject>) => {
      const id = faker.number.int();
      return {
        ...acc,
        [id]: {
          id,
          termId: termId,
          name: faker.person.jobArea(),
          type: faker.helpers.arrayElement(Object.values(SubjectType)),
        },
      };
    }, {});

    return Object.values(this.subjects[termId]);
  }

  async addSubject(params: AddSubjectParams): Promise<Subject> {
    await delay(2 * SECOND);

    const termSubjects = this.subjects[params.termId];

    const subject: Subject = {
      id: faker.number.int(),
      termId: params.termId,
      name: params.name,
      type: params.type,
    };

    if (!termSubjects) {
      this.subjects[params.termId] = {
        [subject.id]: subject,
      };
      return subject;
    }

    this.subjects[params.termId] = {
      ...this.subjects[params.termId],
      [subject.id]: subject,
    };

    return subject;
  }

  async editSubject(params: EditSubjectParams): Promise<Subject> {
    await delay(2 * SECOND);

    const termSubjects = this.subjects[params.termId];

    if (!termSubjects) {
      throw Error(`Could not edit subject: ${params.subjectId}`);
    }

    const subject = termSubjects[params.subjectId];

    if (!subject) {
      throw Error(`Could not edit subject: ${params.subjectId}`);
    }

    termSubjects[params.subjectId] = {
      ...termSubjects[params.subjectId],
      ...params,
    };

    return termSubjects[params.subjectId];
  }

  async deleteSubjects(params: DeleteSubjectsParams): Promise<void> {
    await delay(2 * SECOND);

    const termSubjects = this.subjects[params.termId];

    if (!termSubjects) {
      throw Error(`Could not edit subject: ${params.termId}`);
    }

    params.subjectIds.forEach((subjectId) => {
      delete termSubjects[subjectId];
    });
  }
}

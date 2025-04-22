import { faker } from '@faker-js/faker';
import { BaseService } from '@/common/services';
import { GrouppedData, HierarchyData } from '@/common/entities'
import {
  Subject,
  HierarchySubjects,
  subjectTypes,
  subjectActivities,
} from '@/subjects/entities';
import { delay, SECOND } from '@/common/utils';

type HierarchySubjectsData = HierarchyData<Subject["term"], Subject["subject"], Subject["subjectActivity"]>;
type GrouppedSubjectData = GrouppedData<Subject["term"], Subject["subject"], Subject["subjectActivity"]>;

export class SubjectsService extends BaseService {
  private subjects: HierarchySubjects[] = [];

  constructor() {
    super();
    this.subjects = new Array(5).fill(null).map(() => ({
      term: {
        id: faker.number.int({ min: 1, max: 500 }),
        number: `SF${faker.string.alphanumeric({ length: 3 }).toUpperCase()}`,
      },
      subjects: new Array(5).fill(null).map(() => ({
        subject: {
          id: faker.number.int({ min: 1, max: 500 }),
          name: faker.word.words({ count: 2 }),
          type: faker.helpers.arrayElement(subjectTypes),
        },
        subjectActivities: new Array(5).fill(null).map(() => ({
          id: faker.number.int({ min: 1, max: 500 }),
          type: faker.helpers.arrayElement(subjectActivities),
          academicHours: faker.number.int({ min: 2, max: 12 }),
        })),
      })),
    }));
  }

  async getSubjects(): Promise<HierarchySubjectsData[]> {
    
    return this.convertHierarchyFrom(this.subjects);
  }

  async addSubject(data: GrouppedSubjectData) {
    await delay(1 * SECOND);

    const item = this.convertGrouppedTo(data);
    const { term, subject } = this.getParams(item);

    if (subject && item.subjectActivity) {
      subject.subjectActivities.push({
        ...item.subjectActivity,
        id: faker.number.int({ min: 1, max: 500 }),
      });
    }
    else if (term && item.subject) {
      term.subjects.push({
        subject: {
          ...item.subject,
          id: faker.number.int({ min: 1, max: 500 }),
        },
        subjectActivities: [],
      });
    }
    else if (item.term) {
      this.subjects.push({
        term: {
          ...item.term,
          id: faker.number.int({ min: 1, max: 500 }),
        },
        subjects: [],
      });
    }
  }

  async editSubject(data: GrouppedSubjectData) {
    await delay(1 * SECOND);

    const item = this.convertGrouppedTo(data);
    const { term, subject, subjectActivityIndex } = this.getParams(item);

    if (subjectActivityIndex >= 0) {
      subject!.subjectActivities[subjectActivityIndex] = {
        ...(item.subjectActivity!),
      };
    }
    else if (subject) {
      subject.subject = { ...(item.subject!) };
    }
    else if (term) {
      term.term = { ...(item.term!) };
    }
  }

  async deleteSubjects(data: Array<GrouppedSubjectData>) {
    await delay(1 * SECOND);

    const items = data.map(d => this.convertGrouppedTo(d));

    const shouldRemoveTerm = (termId: number) =>
      items.some(item => !item.subject && item.term?.id === termId);
  
    const shouldRemoveSubject = (subjectId?: number) =>
      items.some(item => !item.subjectActivity && item.subject?.id === subjectId);
  
    const shouldRemoveSubjectActivity = (programId?: number) =>
      items.some(item => item.subjectActivity?.id === programId);
  
    const filteredSubjects: HierarchySubjects[] = this.subjects
      .filter(group => !shouldRemoveTerm(group.term!.id))
      .map(group => ({
        term: group.term,
        subjects: group.subjects
          .filter(subj => !shouldRemoveSubject(subj.subject?.id))
          .map(subj => ({
            subject: subj.subject,
            subjectActivities: subj.subjectActivities.filter(
              activity => !shouldRemoveSubjectActivity(activity?.id)
            )
          }))
      }));
  
    this.subjects = filteredSubjects;
  }

  getParams(subjectData: Subject) {
    const term = this.subjects.find(ep => ep.term?.id == subjectData.term?.id);
    const subject = term?.subjects.find(s => s.subject?.id == subjectData.subject?.id);
    const subjectActivityIndex = subject?.subjectActivities.findIndex(ep => ep?.id === subjectData.subjectActivity?.id) ?? -1;

    return {
      term,
      subject,
      subjectActivityIndex,
    };
  }

  convertHierarchyFrom(subjects: HierarchySubjects[]): HierarchySubjectsData[] {
    return subjects.map(p => ({
      data1Value: p.term,
      data2: p.subjects.map(s => ({
        data2Value: s.subject,
        data3: s.subjectActivities,
      }))
    }))
  }

  convertGrouppedTo(subject: GrouppedSubjectData): Subject {
    return {
      term: subject.data1,
      subject: subject.data2,
      subjectActivity: subject.data3,
    }
  }
}

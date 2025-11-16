import { SubjectActivityType } from './SubjectActivityType';
import { SubjectId } from '@/subjects/entities';
import { SubjectActivityId } from './SubjectActivity';

export type EditSubjectActivityParams = {
  subjectActivityId: SubjectActivityId;
  subjectId: SubjectId;
  type?: SubjectActivityType;
  academicHours?: number;
};

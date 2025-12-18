import { SubjectActivityType } from './SubjectActivityType';
import { SubjectId } from '@/subjects/entities';

export type AddSubjectActivityParams = {
  subjectId: SubjectId;
  type: SubjectActivityType;
  academicHours: number;
};

import { SubjectType } from './SubjectType';
import { TermId } from '@/terms/entities';

export type AddSubjectParams = {
  termId: TermId;
  name: string;
  type: SubjectType;
};

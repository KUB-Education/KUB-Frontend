import { SubjectType } from './SubjectType';
import { TermId } from '@/terms/entities';
import { SubjectId } from './Subject';

export type EditSubjectParams = {
  subjectId: SubjectId;
  termId: TermId;
  name?: string;
  type?: SubjectType;
};

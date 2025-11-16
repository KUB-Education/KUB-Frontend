import { TermId } from '@/terms/entities';
import { SubjectId } from './Subject';

export type DeleteSubjectsParams = {
  termId: TermId;
  subjectIds: Array<SubjectId>;
};

import { SubjectType } from './SubjectType';
import { TermId } from '@/terms/entities';

export type SubjectId = number;

export type Subject = {
  id: SubjectId;
  termId: TermId;
  name: string;
  type: SubjectType;
};

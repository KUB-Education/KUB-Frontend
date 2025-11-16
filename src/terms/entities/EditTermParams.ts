import { EducationalProgramId } from '@/educational-programs/entities';
import { TermId } from './Term';

export type EditTermParams = {
  educationalProgramId: EducationalProgramId;
  termId: TermId;
  number: number;
};

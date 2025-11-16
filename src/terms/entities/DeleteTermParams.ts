import { EducationalProgramId } from '@/educational-programs/entities';
import { TermId } from './Term';

export type DeleteTermParams = {
  educationalProgramId: EducationalProgramId;
  termIds: Array<TermId>;
};

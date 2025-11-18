import { EducationalProgramId } from '@/educational-programs/entities';
import {
  minValueValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type TermId = number;

export type Term = {
  id: TermId;
  educationalProgramId: EducationalProgramId;
  number: number;
};

export const termNumberValidator = {
  ...requiredValidator(),
  ...minValueValidator(1),
};

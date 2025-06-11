import { GrouppedData } from '@/common/entities';
import {
  EducationalProgram,
  Specialty,
  StudyField,
} from './EducationalProgram.ts';
// TODO refactor this
export type EditEducationalProgramParams = GrouppedData<
  StudyField,
  Specialty,
  EducationalProgram
>;

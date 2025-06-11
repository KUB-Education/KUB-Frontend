import { GrouppedData } from '@/common/entities';
import {
  EducationalProgram,
  Specialty,
  StudyField,
} from './EducationalProgram.ts';
// TODO refactor this
export type DeleteEducationalProgramsParams = Array<
  GrouppedData<StudyField, Specialty, EducationalProgram>
>;

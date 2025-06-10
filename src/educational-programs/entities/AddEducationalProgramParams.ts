import { GrouppedData } from '@/common/entities';
import { EducationalProgram } from './EducationalProgram.ts';
// TODO refactor this
export type AddEducationalProgramParams = GrouppedData<
  EducationalProgram['studyField'],
  EducationalProgram['specialty'],
  EducationalProgram['educationalProgram']
>;

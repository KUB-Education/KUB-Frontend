import { GrouppedData } from '@/common/entities';
import { EducationalProgram } from './EducationalProgram.ts';
// TODO refactor this
export type EditEducationalProgramParams = GrouppedData<
  EducationalProgram['studyField'],
  EducationalProgram['specialty'],
  EducationalProgram['educationalProgram']
>;

import { EducationalProgramId } from './EducationalProgram.ts';

export type EditEducationalProgramParams = {
  id: EducationalProgramId;
  studyField: {
    id: number;
    code?: string;
    name?: string;
  },
  specialty: {
    id: number;
    code?: string;
    name?: string;
  },
  educationalProgram: {
    id: number;
    name?: string;
    degreeType?: string;
    studyFormat?: string;
  },
};

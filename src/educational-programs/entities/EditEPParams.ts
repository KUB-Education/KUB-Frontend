import { EPId } from './EducationalProgram.ts';

export type EditEPParams = {
  id: EPId;
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

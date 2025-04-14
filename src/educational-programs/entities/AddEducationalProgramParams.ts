export type AddEducationalProgramParams = {
  studyField: {
    code: string;
    name: string;
  },
  specialty:{
    code: string;
    name: string;
  },
  educationalProgram: {
    name: string;
    degreeType: string;
    studyFormat: string;
  },
};

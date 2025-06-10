
export type EducationalProgram = {
  studyField?: {
    id: number;
    code: string;
    name: string;
  };
  specialty?: {
    id: number;
    code: string;
    name: string;
  };
  educationalProgram?: {
    id: number;
    name: string;
    degreeType: string;
    studyFormat: string;
  };
};

export type HierarchyEducationalPrograms = {
  studyField: EducationalProgram["studyField"];
  specialties: Array<{
    specialty: EducationalProgram["specialty"];
    educationalPrograms: (EducationalProgram["educationalProgram"])[];
  }>;
};

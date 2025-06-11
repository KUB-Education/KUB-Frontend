export type StudyField = {
  id: number;
  code: string;
  name: string;
};

export type Specialty = {
  id: number;
  code: string;
  name: string;
};

export type EducationalProgram = {
  id: number;
  name: string;
  degreeType: string;
  studyFormat: string;
};

export type HierarchyEducationalPrograms = {
  studyField: StudyField;
  specialties: Array<{
    specialty: Specialty;
    educationalPrograms: EducationalProgram[];
  }>;
};

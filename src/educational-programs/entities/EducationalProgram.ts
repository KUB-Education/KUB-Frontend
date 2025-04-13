export type EPId = number;
export type SubjectId = number;

export type EducationalProgram = {
  id: EPId;
  studyField: {
    id: number;
    code: string;
    name: string;
  };
  specialty: {
    id: number;
    code: string;
    name: string;
  };
  educationalProgram: {
    id: number;
    name: string;
    degreeType: string;
    studyFormat: string;
  };
};

export type Subject = {
  id: SubjectId;
  term: {
    id: number;
    number: string;
  };
  subject: {
    id: number;
    name: string;
    type: 'Обов’язкова' | 'Вибіркова';
  };
  subjectActivity: {
    id: number;
    type: 'Лекція' | 'Лабораторна' | 'Семінар' | 'Залік';
    academicHours: number;
  }
}

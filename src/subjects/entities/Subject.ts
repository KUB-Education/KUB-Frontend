export type Subject = {
  term?: {
    id: number;
    number: string;
  };
  subject?: {
    id: number;
    name: string;
    type: string;
  };
  subjectActivity?: {
    id: number;
    type: string;
    academicHours: number;
  }
};

export type HierarchySubjects = {
  term: Subject["term"];
  subjects: Array<{
    subject: Subject["subject"];
    subjectActivities: (Subject["subjectActivity"])[];
  }>;
};

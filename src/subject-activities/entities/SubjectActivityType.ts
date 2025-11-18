export enum SubjectActivityType {
  LECTURE = 'LECTURE',
  LABORATORY = 'LABORATORY',
  SEMINAR = 'SEMINAR',
  EXAM = 'EXAM',
  CREDIT = 'CREDIT',
  RESUBMISSION = 'RESUBMISSION',
  COMMISSION = 'COMMISSION',
  CONSULTATION = 'CONSULTATION',
}

export const subjectActivityTypes = Object.values(SubjectActivityType);

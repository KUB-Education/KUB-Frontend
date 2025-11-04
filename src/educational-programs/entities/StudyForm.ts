export enum StudyForm {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  ONLINE = 'ONLINE',
}

export const studyForms = Object.values(StudyForm);

const studyFormLabelsMap: Record<StudyForm, string> = {
  [StudyForm.FULL_TIME]: 'Full-time',
  [StudyForm.PART_TIME]: 'Part-time',
  [StudyForm.ONLINE]: 'Online',
};

export const getStudyFormLabel = (format: StudyForm) => {
  return studyFormLabelsMap[format] ? studyFormLabelsMap[format] : 'Unknown';
};

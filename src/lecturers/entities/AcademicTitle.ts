export enum AcademicTitle {
  NONE = 'NONE',
  DOCTOR_OF_PHILOSOPHY = 'DOCTOR_OF_PHILOSOPHY',
  DOCTOR_OF_SCIENCE = 'DOCTOR_OF_SCIENCE',
}

export const academicTitles = Object.values(AcademicTitle);

const academicTitleLabelsMap: Record<AcademicTitle, string> = {
  [AcademicTitle.NONE]: 'None',
  [AcademicTitle.DOCTOR_OF_PHILOSOPHY]: 'Doctor of Philosophy',
  [AcademicTitle.DOCTOR_OF_SCIENCE]: 'Doctor of Science',
};

export const getAcademicTitleLabel = (title: AcademicTitle) => {
  return academicTitleLabelsMap[title]
    ? academicTitleLabelsMap[title]
    : 'Unknown';
};

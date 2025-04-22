export enum SubjectActivity {
  LECTION = 'LECTION',
  LAB = 'LAB',
  SEMINAR = 'SEMINAR',
}

export const subjectActivities = Object.values(SubjectActivity);

const subjectActivityLabelsMap: Record<SubjectActivity, string> = {
  [SubjectActivity.LECTION]: 'Lection',
  [SubjectActivity.LAB]: 'Lab',
  [SubjectActivity.SEMINAR]: 'Seminar',
};

export const getSubjectActivityLabel = (activity: SubjectActivity) => {
  return subjectActivityLabelsMap[activity]
    ? subjectActivityLabelsMap[activity]
    : 'Unknown';
};

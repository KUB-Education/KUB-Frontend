export enum AcademicDegree {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PHD = 'PHD',
}

export const academicDegrees = Object.values(AcademicDegree);

const academicDegreeLabelsMap: Record<AcademicDegree, string> = {
  [AcademicDegree.BACHELOR]: 'Bachelor',
  [AcademicDegree.MASTER]: 'Master',
  [AcademicDegree.PHD]: 'PhD',
};

export const getAcademicDegreeLabel = (degree: AcademicDegree) => {
  return academicDegreeLabelsMap[degree]
    ? academicDegreeLabelsMap[degree]
    : 'Unknown';
};

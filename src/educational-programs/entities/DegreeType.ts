export enum DegreeType {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PHD = 'PHD',
}

export const degreeTypes = Object.values(DegreeType);

const degreeTypeLabelsMap: Record<DegreeType, string> = {
  [DegreeType.BACHELOR]: 'Bachelor',
  [DegreeType.MASTER]: 'Master',
  [DegreeType.PHD]: 'PhD',
};

export const getDegreeTypeLabel = (degree: DegreeType) => {
  return degreeTypeLabelsMap[degree] ? degreeTypeLabelsMap[degree] : 'Unknown';
};

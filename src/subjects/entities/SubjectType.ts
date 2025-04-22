export enum SubjectType {
  MANDATORY = 'MANDATORY',
  OPTIONAL = 'OPTIONAL',
}

export const subjectTypes = Object.values(SubjectType);

const subjectTypeLabelsMap: Record<SubjectType, string> = {
  [SubjectType.MANDATORY]: 'Mandatory',
  [SubjectType.OPTIONAL]: 'Optional',
};

export const getSubjectTypeLabel = (type: SubjectType) => {
  return subjectTypeLabelsMap[type]
    ? subjectTypeLabelsMap[type]
    : 'Unknown';
};

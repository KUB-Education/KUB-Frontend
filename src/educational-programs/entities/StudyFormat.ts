export enum StudyFormat {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  ONLINE = 'ONLINE',
}

export const studyFormats = Object.values(StudyFormat);

const studyFormatLabelsMap: Record<StudyFormat, string> = {
  [StudyFormat.FULL_TIME]: 'Full-time',
  [StudyFormat.PART_TIME]: 'Part-time',
  [StudyFormat.ONLINE]: 'Online',
};

export const getStudyFormatLabel = (format: StudyFormat) => {
  return studyFormatLabelsMap[format]
    ? studyFormatLabelsMap[format]
    : 'Unknown';
};

export enum LecturerPosition {
  ASSISTANT = 'ASSISTANT',
  ASSOCIATE_PROFESSOR = 'ASSOCIATE_PROFESSOR',
  PROFESSOR = 'PROFESSOR',
}

export const lecturerPositions = Object.values(LecturerPosition);

const lecturerPositionLabelsMap: Record<LecturerPosition, string> = {
  [LecturerPosition.ASSISTANT]: 'Assistant',
  [LecturerPosition.ASSOCIATE_PROFESSOR]: 'Associate Professor',
  [LecturerPosition.PROFESSOR]: 'Professor',
};

export const getLecturerPositionLabel = (position: LecturerPosition) => {
  return lecturerPositionLabelsMap[position]
    ? lecturerPositionLabelsMap[position]
    : 'Unknown';
};

export type LecturerPositionId = number;

export type LecturerPosition = {
  id: LecturerPositionId;
  name: LecturerPositionName;
};

export enum LecturerPositionName {
  ASSISTANT = 'ASSISTANT',
  ASSOCIATE_PROFESSOR = 'ASSOCIATE_PROFESSOR',
  PROFESSOR = 'PROFESSOR',
}

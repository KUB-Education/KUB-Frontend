import { LecturerId } from './Lecturer';
import { AcademicTitleId } from './AcademicTitle';

export type DeleteAcademicTitleParams = {
  lecturerId: LecturerId;
  academicTitleId: AcademicTitleId;
};

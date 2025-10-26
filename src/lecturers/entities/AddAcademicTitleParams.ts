import { LecturerId } from './Lecturer';
import { AcademicTitleId } from './AcademicTitle';

export type AddAcademicTitleParams = {
  lecturerId: LecturerId;
  academicTitleId: AcademicTitleId;
};

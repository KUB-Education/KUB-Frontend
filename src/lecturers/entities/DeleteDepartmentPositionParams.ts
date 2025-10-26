import { LecturerId } from './Lecturer';
import { LecturerDepartmentPositionId } from './LecturerDepartmentPosition';

export type DeleteDepartmentPositionParams = {
  lecturerId: LecturerId;
  departmentPositionId: LecturerDepartmentPositionId;
};

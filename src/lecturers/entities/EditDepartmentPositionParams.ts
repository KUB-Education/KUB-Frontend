import { LecturerId } from './Lecturer';
import { LecturerPositionId } from './LecturerPosition';
import { LecturerPositionStatus } from './LecturerPositionStatus.ts';
import { LecturerDepartmentPositionId } from '@/lecturers/entities';

export type EditDepartmentPositionParams = {
  lecturerId: LecturerId;
  departmentPositionId: LecturerDepartmentPositionId;
  positionId: LecturerPositionId;
  status: LecturerPositionStatus;
};

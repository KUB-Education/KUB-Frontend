import { LecturerId } from './Lecturer.ts';
import { LecturerPositionId } from './LecturerPosition.ts';
import { DepartmentId } from '@/departments/entities';

export type AddDepartmentPositionParams = {
  lecturerId: LecturerId;
  departmentId: DepartmentId;
  positionId: LecturerPositionId;
};

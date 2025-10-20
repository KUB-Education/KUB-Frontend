import { LecturerId } from './Lecturer';
import { LecturerPosition } from './LecturerPosition';
import { DepartmentId } from '@/departments/entities';
import { LecturerStatus } from './LecturerStatus';

export type EditLecturerDepartmentParams = {
  lecturerId: LecturerId;
  id: DepartmentId;
  position: LecturerPosition;
  status: LecturerStatus;
};

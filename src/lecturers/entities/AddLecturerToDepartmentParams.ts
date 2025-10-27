import { LecturerId } from './Lecturer.ts';
import { LecturerPosition } from './LecturerPosition.ts';
import { DepartmentId } from '@/departments/entities';

export type AddLecturerToDepartmentParams = {
  lecturerId: LecturerId;
  id: DepartmentId;
  name: string;
  position: LecturerPosition;
};

import { DepartmentDto } from '@/departments/services/dto';
import { LecturerPositionDto } from './LecturerPositionDto';
import { LecturerPositionStatus } from '@/lecturers/entities';

export type LecturerDepartmentPositionDto = {
  id: number;
  department: DepartmentDto;
  position: LecturerPositionDto;
  status: LecturerPositionStatus;
};

import { LecturerId } from '@/lecturers/entities';
import { UserDto } from '@/users/services/dto';
import { DepartmentPositionDto } from './DepartmentPositionDto';
import { AcademicTitleDto } from './AcademicTitleDto';

export type LecturerDto = {
  id: LecturerId;
  user: UserDto;
  department_positions: Array<DepartmentPositionDto>;
  academic_titles: Array<AcademicTitleDto>;
};

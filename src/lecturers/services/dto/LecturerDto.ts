import { LecturerId } from '@/lecturers/entities';
import { UserDto } from '@/users/services/dto';
import { LecturerDepartmentPositionDto } from './LecturerDepartmentPositionDto';
import { AcademicTitleDto } from './AcademicTitleDto';

export type LecturerDto = {
  id: LecturerId;
  user: UserDto;
  department_positions: Array<LecturerDepartmentPositionDto>;
  academic_titles: Array<AcademicTitleDto>;
};

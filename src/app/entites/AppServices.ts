import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import { EducationalProgramsService } from '@/educational-programs/services';
import { SubjectsService } from '@/subjects/services';

export type AppServices = {
  authService: AuthService;
  departmentsService: DepartmentsService;
  lecturesService: LecturersService;
  roomsService: RoomsService;
  educationalProgramsService: EducationalProgramsService;
  subjectsService: SubjectsService;
};

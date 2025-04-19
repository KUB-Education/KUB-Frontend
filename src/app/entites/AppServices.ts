import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import { EducationalProgramsService } from '@/educational-programs/services';
import { UserService } from '@/users/services';

export type AppServices = {
  authService: AuthService;
  userService: UserService;
  departmentsService: DepartmentsService;
  lecturesService: LecturersService;
  roomsService: RoomsService;
  educationalProgramsService: EducationalProgramsService;
};

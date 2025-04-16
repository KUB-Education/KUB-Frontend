import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';
import { StudentsService } from '@/students/ui/pages/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';

export type AppServices = {
  authService: AuthService;
  departmentsService: DepartmentsService;
  lecturesService: LecturersService;
  studentsService: StudentsService;
  roomsService: RoomsService;
};

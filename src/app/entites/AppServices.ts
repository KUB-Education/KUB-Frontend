import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';

export type AppServices = {
  authService: AuthService;
  departmentsService: DepartmentsService;
  lecturesService: LecturersService;
  roomsService: RoomsService;
};

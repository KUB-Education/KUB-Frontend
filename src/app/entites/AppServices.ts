import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';

export type AppServices = {
  authService: AuthService;
  lecturesService: LecturersService;
  roomsService: RoomsService;
};

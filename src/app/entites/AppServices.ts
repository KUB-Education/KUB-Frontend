import { AuthService } from '@/auth/services';
import { LecturersService } from '@/lecturers/services';

export type AppServices = {
  authService: AuthService;
  lecturesService: LecturersService;
};

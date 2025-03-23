import { useState } from 'react';
import { AuthService } from '@/auth/services';
import { config } from '../config';
import { AppServices } from '../entites';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';

function initServices(): AppServices {
  const authService = new AuthService();
  const lecturesService = new LecturersService();
  const roomsService = new RoomsService();

  return {
    authService,
    lecturesService,
    roomsService
  };
}

export function useApp() {
  const [appServices] = useState<AppServices>(() => initServices());

  return {
    appServices,
    config,
  };
}

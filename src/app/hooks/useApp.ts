import { useState } from 'react';
import { AuthService } from '@/auth/services';
import { config } from '../config';
import { AppServices } from '../entites';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import { EducationalProgramsService } from '@/educational-programs/services';
import { SubjectsService } from '@/subjects/services';

function initServices(): AppServices {
  const authService = new AuthService();
  const departmentsService = new DepartmentsService();
  const lecturesService = new LecturersService(departmentsService);
  const roomsService = new RoomsService();
  const educationalProgramsService = new EducationalProgramsService();
  const subjectsService = new SubjectsService();

  return {
    authService,
    departmentsService,
    lecturesService,
    roomsService,
    educationalProgramsService,
    subjectsService,
  };
}

export function useApp() {
  const [appServices] = useState<AppServices>(() => initServices());

  return {
    appServices,
    config,
  };
}

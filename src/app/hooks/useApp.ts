import { useState } from 'react';
import { AuthService, AuthTokensStorage } from '@/auth/services';
import { config } from '../config';
import { AppServices } from '../entites';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import { EducationalProgramsService } from '@/educational-programs/services';
import {
  AxiosHttpClient,
  HttpClientWithSessionRefresh,
} from '@/common/http-client';
import { PersistentStorage } from '@/common/persistent-storage';
import { UserService } from '@/users/services';
import { StudentsService } from '@/students/services';
import { StudentGroupsService } from '@/student-groups/services';

function initServices(): AppServices {
  const persistentStorage = new PersistentStorage();
  const authTokensStorage = new AuthTokensStorage(persistentStorage);

  const axiosHttpClient = new AxiosHttpClient(config.apiUrl);
  const httpClient = new HttpClientWithSessionRefresh(
    axiosHttpClient,
    authTokensStorage,
  );

  const authService = new AuthService(httpClient, authTokensStorage);
  const userService = new UserService(httpClient);
  const studentsService = new StudentsService(httpClient);
  const studentGroupsService = new StudentGroupsService(httpClient);
  const departmentsService = new DepartmentsService(httpClient);
  const lecturesService = new LecturersService(httpClient);
  const roomsService = new RoomsService(httpClient);
  const educationalProgramsService = new EducationalProgramsService(httpClient);

  return {
    authService,
    userService,
    studentsService,
    studentGroupsService,
    departmentsService,
    lecturesService,
    roomsService,
    educationalProgramsService,
  };
}

export function useApp() {
  const [appServices] = useState<AppServices>(() => initServices());

  return {
    appServices,
    config,
  };
}

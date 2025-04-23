import { useState } from 'react';
import { AuthService, AuthTokensStorage } from '@/auth/services';
import { config } from '../config';
import { AppServices } from '../entites';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import { EducationalProgramsService } from '@/educational-programs/services';
import { SubjectsService } from '@/subjects/services';
import {
  AxiosHttpClient,
  HttpClientWithSessionRefresh,
} from '@/common/http-client';
import { PersistentStorage } from '@/common/persistent-storage';
import { UserService } from '@/users/services';

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
  const departmentsService = new DepartmentsService(httpClient);
  const lecturesService = new LecturersService(httpClient, departmentsService);
  const roomsService = new RoomsService(httpClient);
  const educationalProgramsService = new EducationalProgramsService(httpClient);
  const subjectsService = new SubjectsService();

  return {
    authService,
    userService,
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

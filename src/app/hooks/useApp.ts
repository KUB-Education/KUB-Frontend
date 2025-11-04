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
import { CurrentUserService } from '@/current-user/services';
import { StudyFieldsService } from '@/study-fields/services';
import { SpecialitiesService } from '@/specialities/services';

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
  const currentUserService = new CurrentUserService(httpClient);
  const studentGroupsService = new StudentGroupsService(httpClient);
  const departmentsService = new DepartmentsService(httpClient);
  const lecturesService = new LecturersService(httpClient, userService);
  const roomsService = new RoomsService(httpClient);
  const studyFieldsService = new StudyFieldsService(httpClient);
  const specialitiesService = new SpecialitiesService(
    httpClient,
    studyFieldsService,
  );
  const educationalProgramsService = new EducationalProgramsService(
    httpClient,
    specialitiesService,
  );
  const studentsService = new StudentsService(
    httpClient,
    specialitiesService,
    educationalProgramsService,
  );

  return {
    authService,
    userService,
    currentUserService,
    studentsService,
    studentGroupsService,
    departmentsService,
    lecturesService,
    roomsService,
    educationalProgramsService,
    studyFieldsService,
    specialitiesService,
  };
}

export function useApp() {
  const [appServices] = useState<AppServices>(() => initServices());

  return {
    appServices,
    config,
  };
}

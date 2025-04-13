import { useState } from 'react';
import { AuthService } from '@/auth/services';
import { config } from '../config';
import { AppServices } from '../entites';
import { LecturersService } from '@/lecturers/services';
import { RoomsService } from '@/rooms/services';
import { DepartmentsService } from '@/departments/services';
import {
  AxiosHttpClient,
  HttpClientWithSessionRefresh,
} from '@/common/http-client';

function initServices(): AppServices {
  const axiosHttpClient = new AxiosHttpClient(config.apiUrl);
  const httpClient = new HttpClientWithSessionRefresh(axiosHttpClient);

  const authService = new AuthService(httpClient);
  const departmentsService = new DepartmentsService(httpClient);
  const lecturesService = new LecturersService(httpClient, departmentsService);
  const roomsService = new RoomsService(httpClient);

  return {
    authService,
    departmentsService,
    lecturesService,
    roomsService,
  };
}

export function useApp() {
  const [appServices] = useState<AppServices>(() => initServices());

  return {
    appServices,
    config,
  };
}

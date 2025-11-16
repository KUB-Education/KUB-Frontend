import { EducationalProgramId } from '@/educational-programs/entities';

export const APP_ROUTES = Object.freeze({
  HOME: '/home',
  USERS: '/users',
  STUDENTS: '/students',
  STUDENT_GROUPS: '/student-groups',
  LECTURERS: '/lecturers',
  ROOMS: '/rooms',
  EDUCATIONAL_PROGRAMS: '/educational-programs',
  EDUCATIONAL_PROGRAM: '/educational-programs/:educationalProgramId',
  getEducationalProgramPath: (id: EducationalProgramId) =>
    `/educational-programs/${id}`,
  DEPARTMENTS: '/departments',
  EDUCATIONAL_COURSES: '/educational-courses',
  TIMETABLES: '/timetables',
  HELP: '/help',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_PASSWORD: '/change-password',
});

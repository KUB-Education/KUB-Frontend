import { AcademicTitle } from './AcademicTitle';
import { UserProfile, UserId, UserStatus } from '@/users/entities';
import { LecturerDepartmentPosition } from './LecturerDepartmentPosition';

export type LecturerId = number;

export type Lecturer = UserProfile & {
  id: LecturerId;
  userId: UserId;
  userStatus: UserStatus;
  departmentPositions: LecturerDepartmentPosition[];
  academicTitles: AcademicTitle[];
};

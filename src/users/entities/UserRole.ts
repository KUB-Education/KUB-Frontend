export enum UserRoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
  ORGANIZER = 'ORGANIZER',
  SYSADMIN = 'SYSADMIN',
}

export type UserRole = {
  id: number;
  type: UserRoleType;
};

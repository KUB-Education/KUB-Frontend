export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
  ORGANIZER = 'ORGANIZER',
  SYSADMIN = 'SYSADMIN',
}

export const userRoles: UserRole[] = Object.values(UserRole);

const userRoleLabelsMap: Record<UserRole, string> = {
  [UserRole.USER]: 'User',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.STUDENT]: 'Student',
  [UserRole.LECTURER]: 'Lecturer',
  [UserRole.ORGANIZER]: 'Organizer',
  [UserRole.SYSADMIN]: 'Sysadmin',
};

export const getUserRoleLabel = (status: UserRole) => {
  return userRoleLabelsMap[status] ? userRoleLabelsMap[status] : 'Unknown';
};

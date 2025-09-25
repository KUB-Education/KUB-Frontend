export enum UserRole {
  ADMIN = 'admin',
  LECTURER = 'lecturer',
  STUDENT = 'student',
}

export const userRoles: UserRole[] = Object.values(UserRole);

const userRoleLabelsMap: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.STUDENT]: 'Student',
  [UserRole.LECTURER]: 'Lecturer',
};

export const getUserRoleLabel = (status: UserRole) => {
  return userRoleLabelsMap[status] ? userRoleLabelsMap[status] : 'Unknown';
};

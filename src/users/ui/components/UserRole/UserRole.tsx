import { useMemo } from 'react';
import { getUserRoleLabel, UserRole as UserRoleType } from '@/users/entities';

export type UserRoleProps = {
  value: UserRoleType;
};

const UserRole = ({ value }: UserRoleProps) => {
  const roleLabel = useMemo(() => {
    return getUserRoleLabel(value);
  }, [value]);

  return <>{roleLabel}</>;
};

export default UserRole;

import {
  UserStatus as UserStatusEnum,
  getUserStatusLabel,
} from '@/users/entities';
import { useMemo } from 'react';

export type AcademicTitleProps = {
  value: UserStatusEnum;
};

const UserStatus = ({ value }: AcademicTitleProps) => {
  const status = useMemo(() => {
    return getUserStatusLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default UserStatus;

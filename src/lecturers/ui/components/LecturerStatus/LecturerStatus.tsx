import {
  LecturerStatus as LecturerStatusEnum,
  getLecturerStatusLabel,
} from '@/lecturers/entities';
import { useMemo } from 'react';

export type LecturerStatusProps = {
  value: LecturerStatusEnum;
};

const LecturerStatus = ({ value }: LecturerStatusProps) => {
  const status = useMemo(() => {
    return getLecturerStatusLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default LecturerStatus;

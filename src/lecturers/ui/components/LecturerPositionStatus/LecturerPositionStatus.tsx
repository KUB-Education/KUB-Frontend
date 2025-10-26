import {
  LecturerPositionStatus as PositionStatus,
  getLecturerPositionStatusLabel,
} from '@/lecturers/entities';
import { useMemo } from 'react';

export type LecturerPositionStatusProps = {
  value: PositionStatus;
};

const LecturerPositionStatus = ({ value }: LecturerPositionStatusProps) => {
  const status = useMemo(() => {
    return getLecturerPositionStatusLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default LecturerPositionStatus;

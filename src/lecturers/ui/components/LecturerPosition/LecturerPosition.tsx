import {
  LecturerPosition as LecturerPositionEnum,
  getLecturerPositionLabel,
} from '@/lecturers/entities';
import { useMemo } from 'react';

export type LecturerPositionProps = {
  value: LecturerPositionEnum;
};

const LecturerPosition = ({ value }: LecturerPositionProps) => {
  const position = useMemo(() => {
    return getLecturerPositionLabel(value);
  }, [value]);

  return <>{position}</>;
};

export default LecturerPosition;

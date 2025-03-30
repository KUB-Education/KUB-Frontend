import {
  AcademicTitle as AcademicTitleEnum,
  getAcademicTitleLabel,
} from '@/lecturers/entities';
import { useMemo } from 'react';

export type AcademicTitleProps = {
  value: AcademicTitleEnum;
};

const AcademicTitle = ({ value }: AcademicTitleProps) => {
  const titleLabel = useMemo(() => {
    return getAcademicTitleLabel(value);
  }, [value]);

  return <>{titleLabel}</>;
};

export default AcademicTitle;

import {
  DegreeType as AcademicDegreeEnum,
  getDegreeTypeLabel,
} from '@/educational-programs/entities';
import { useMemo } from 'react';

export type DegreeTypeProps = {
  value: AcademicDegreeEnum;
};

const DegreeType = ({ value }: DegreeTypeProps) => {
  const status = useMemo(() => {
    return getDegreeTypeLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default DegreeType;

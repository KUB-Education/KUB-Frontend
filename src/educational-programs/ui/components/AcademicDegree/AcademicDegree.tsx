import {
  AcademicDegree as AcademicDegreeEnum,
  getAcademicDegreeLabel,
} from '@/educational-programs/entities';
import { useMemo } from 'react';

export type AcademicDegreeProps = {
  value: AcademicDegreeEnum;
};

const AcademicDegree = ({ value }: AcademicDegreeProps) => {
  const status = useMemo(() => {
    return getAcademicDegreeLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default AcademicDegree;

import {
  StudyFormat as StudyFormatEnum,
  getStudyFormatLabel,
} from '@/educational-programs/entities';
import { useMemo } from 'react';

export type StudyFormatProps = {
  value: StudyFormatEnum;
};

const StudyFormat = ({ value }: StudyFormatProps) => {
  const status = useMemo(() => {
    return getStudyFormatLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default StudyFormat;

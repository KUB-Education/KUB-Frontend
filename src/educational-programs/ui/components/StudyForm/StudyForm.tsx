import {
  StudyForm as StudyFormatEnum,
  getStudyFormLabel,
} from '@/educational-programs/entities';
import { useMemo } from 'react';

export type StudyFormProps = {
  value: StudyFormatEnum;
};

const StudyForm = ({ value }: StudyFormProps) => {
  const status = useMemo(() => {
    return getStudyFormLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default StudyForm;

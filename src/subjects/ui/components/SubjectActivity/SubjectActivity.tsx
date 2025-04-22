import {
  SubjectActivity as SubjectActivityEnum,
  getSubjectActivityLabel,
} from '@/subjects/entities';
import { useMemo } from 'react';

export type SubjectActivityProps = {
  value: SubjectActivityEnum;
};

const SubjectActivity = ({ value }: SubjectActivityProps) => {
  const status = useMemo(() => {
    return getSubjectActivityLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default SubjectActivity;

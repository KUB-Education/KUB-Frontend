import {
  SubjectType as SubjectTypeEnum,
  getSubjectTypeLabel,
} from '@/subjects/entities';
import { useMemo } from 'react';

export type SubjectTypeProps = {
  value: SubjectTypeEnum;
};

const SubjectType = ({ value }: SubjectTypeProps) => {
  const status = useMemo(() => {
    return getSubjectTypeLabel(value);
  }, [value]);

  return <>{status}</>;
};

export default SubjectType;

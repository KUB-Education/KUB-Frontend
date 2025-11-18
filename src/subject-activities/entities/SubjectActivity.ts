import { SubjectActivityType } from './SubjectActivityType';
import { SubjectId } from '@/subjects/entities';
import {
  minValueValidator,
  requiredValidator,
} from '@/common/utils/validators';

export type SubjectActivityId = number;

export type SubjectActivity = {
  id: SubjectActivityId;
  subjectId: SubjectId;
  type: SubjectActivityType;
  academicHours: number;
};

export const academicHoursValidator = {
  ...requiredValidator(),
  ...minValueValidator(1),
};

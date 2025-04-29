import {
  maxLengthValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type DepartmentId = number;

export type Department = {
  id: DepartmentId;
  name: string;
};

export const departmentNameValidator = {
  ...requiredValidator(),
  ...maxLengthValidator(256),
};
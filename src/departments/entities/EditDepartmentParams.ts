import { DepartmentId } from './Department.ts';

export type EditDepartmentParams = {
  id: DepartmentId;
  name?: string;
};

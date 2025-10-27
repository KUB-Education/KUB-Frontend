import { Department, DepartmentId } from '@/departments/entities';
import { LecturerPosition } from './LecturerPosition';
import { LecturerStatus } from './LecturerStatus';
import { difference } from '@/common/utils';

export type LecturerDepartment = Department & {
  position: LecturerPosition;
  status: LecturerStatus;
};

export const getAvailableLecturerDepartments = (
  lecturerDepartments: LecturerDepartment[],
  departments: Department[],
) => {
  const lecturerDepartmentIds = lecturerDepartments.map(
    (department) => department.id,
  );
  const departmentsIds = departments.map((department) => department.id);

  const availableDepartmentIdsMap: Record<DepartmentId, boolean> = difference(
    departmentsIds,
    lecturerDepartmentIds,
  ).reduce((acc, departmentId) => ({ ...acc, [departmentId]: true }), {});

  return departments.filter(
    (department) => availableDepartmentIdsMap[department.id],
  );
};

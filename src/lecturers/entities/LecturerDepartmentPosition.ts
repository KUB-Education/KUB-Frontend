import { Department, DepartmentId } from '@/departments/entities';
import { LecturerPosition } from './LecturerPosition';
import { LecturerPositionStatus } from './LecturerPositionStatus.ts';
import { difference } from '@/common/utils';

export type LecturerDepartmentPositionId = number;

export type LecturerDepartmentPosition = {
  id: LecturerDepartmentPositionId;
  department: Department;
  position: LecturerPosition;
  status: LecturerPositionStatus;
};

export const getAvailableDepartmentPositions = (
  departmentPositions: LecturerDepartmentPosition[],
  departments: Department[],
) => {
  const lecturerDepartmentIds = departmentPositions.map(
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

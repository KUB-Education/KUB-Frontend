export enum LecturerPositionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}

export const lecturerPositionStatuses = Object.values(LecturerPositionStatus);

const lecturerPositionStatusLabelsMap: Record<LecturerPositionStatus, string> =
  {
    [LecturerPositionStatus.ACTIVE]: 'Active',
    [LecturerPositionStatus.INACTIVE]: 'Inactive',
    [LecturerPositionStatus.TERMINATED]: 'Terminated',
  };

export const getLecturerPositionStatusLabel = (
  status: LecturerPositionStatus,
) => {
  return lecturerPositionStatusLabelsMap[status]
    ? lecturerPositionStatusLabelsMap[status]
    : 'Unknown';
};

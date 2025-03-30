export enum LecturerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
}

export const lecturerStatuses = Object.values(LecturerStatus);

const lecturerStatusLabelsMap: Record<LecturerStatus, string> = {
  [LecturerStatus.ACTIVE]: 'Active',
  [LecturerStatus.INACTIVE]: 'Inactive',
  [LecturerStatus.TERMINATED]: 'Terminated',
};

export const getLecturerStatusLabel = (status: LecturerStatus) => {
  return lecturerStatusLabelsMap[status]
    ? lecturerStatusLabelsMap[status]
    : 'Unknown';
};

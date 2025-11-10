export enum StudentEducationalProgramStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TERMINATED = 'TERMINATED',
  GRADUATED = 'GRADUATED',
}

export const studentEducationalProgramStatuses = Object.values(
  StudentEducationalProgramStatus,
);

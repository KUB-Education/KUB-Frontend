import { EducationalProgram } from '@/educational-programs/entities';
import { StudentEducationalProgramTuition } from './StudentEducationalProgramTuition';
import { StudentEducationalProgramStatus } from './StudentEducationalProgramStatus.ts';

export type StudentEducationalProgramId = number;

export type StudentEducationalProgram = {
  id: StudentEducationalProgramId;
  educationalProgram: EducationalProgram;
  tuition: StudentEducationalProgramTuition;
  status: StudentEducationalProgramStatus;
  startDate: number;
  endDate: number;
};

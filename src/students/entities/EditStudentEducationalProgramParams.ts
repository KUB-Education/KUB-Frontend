import { StudentId } from './Student';
import { StudentEducationalProgramTuition } from './StudentEducationalProgramTuition';
import { StudentEducationalProgramStatus } from './StudentEducationalProgramStatus';
import { StudentEducationalProgramId } from './StudentEducationalProgram';

export type EditStudentEducationalProgramParams = {
  studentId: StudentId;
  studentEducationalProgramId: StudentEducationalProgramId;
  startDate?: number;
  endDate?: number;
  tuition?: StudentEducationalProgramTuition;
  status?: StudentEducationalProgramStatus;
};

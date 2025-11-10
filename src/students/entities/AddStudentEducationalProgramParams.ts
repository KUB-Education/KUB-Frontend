import { StudentId } from './Student';
import { EducationalProgramId } from '@/educational-programs/entities';
import { StudentEducationalProgramTuition } from './StudentEducationalProgramTuition';

export type AddStudentEducationalProgramParams = {
  studentId: StudentId;
  educationalProgramId: EducationalProgramId;
  startDate: number;
  tuition: StudentEducationalProgramTuition;
};

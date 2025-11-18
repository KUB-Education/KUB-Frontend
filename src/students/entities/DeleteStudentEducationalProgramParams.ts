import { StudentId } from './Student';
import { StudentEducationalProgramId } from './StudentEducationalProgram';

export type DeleteStudentEducationalProgramParams = {
  studentId: StudentId;
  studentEducationalProgramId: StudentEducationalProgramId;
};

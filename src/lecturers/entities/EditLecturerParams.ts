import { LecturerId } from './Lecturer.ts';
import { AcademicTitleId } from './AcademicTitle.ts';
import { LecturerDepartment } from './LecturerDepartment';

export type EditLecturerParams = {
  id: LecturerId;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  departments?: Array<LecturerDepartment>;
  academicTitles?: Array<AcademicTitleId>;
};

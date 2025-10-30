import { difference } from '@/common/utils';
import { Lecturer } from './Lecturer';

export type AcademicTitleId = number;

export type AcademicTitle = {
  id: AcademicTitleId;
  name: AcademicTitleName;
};

export enum AcademicTitleName {
  DOCTOR_OF_PHILOSOPHY = 'DOCTOR_OF_PHILOSOPHY',
  DOCTOR_OF_SCIENCE = 'DOCTOR_OF_SCIENCE',
  PHD_OF_MATHEMATICS = 'PHD_OF_MATHEMATICS',
  PHD_OF_STATISTICS = 'PHD_OF_STATISTICS',
  PHD_OF_APPLIED_MATH = 'PHD_OF_APPLIED_MATH',
  PHD_OF_SOFTWARE_ENGINEERING = 'PHD_OF_SOFTWARE_ENGINEERING',
  PHD_OF_COMPUTER_SCIENCES = 'PHD_OF_COMPUTER_SCIENCES',
  PHD_OF_SYSTEM_ANALYSIS = 'PHD_OF_SYSTEM_ANALYSIS',
  PHD_OF_CYBERSECURITY = 'PHD_OF_CYBERSECURITY',
  PHD_OF_INFORMATION_SYSTEMS_AND_TECHNOLOGIES = 'PHD_OF_INFORMATION_SYSTEMS_AND_TECHNOLOGIES',
  PHD_OF_COMPUTER_ENGINEERING = 'PHD_OF_COMPUTER_ENGINEERING',
}

export const academicTitleNames = Object.values(AcademicTitleName);

const academicTitleLabelsMap: Record<AcademicTitleName, string> = {
  [AcademicTitleName.DOCTOR_OF_PHILOSOPHY]: 'Doctor of Philosophy',
  [AcademicTitleName.DOCTOR_OF_SCIENCE]: 'Doctor of Science',
  [AcademicTitleName.PHD_OF_MATHEMATICS]: 'Phd of Mathematics',
  [AcademicTitleName.PHD_OF_STATISTICS]: 'Phd of Statistics',
  [AcademicTitleName.PHD_OF_APPLIED_MATH]: 'Phd of Applied Math',
  [AcademicTitleName.PHD_OF_SOFTWARE_ENGINEERING]:
    'Phd of Software Engineering',
  [AcademicTitleName.PHD_OF_COMPUTER_SCIENCES]: 'Phd of Computer Sciences',
  [AcademicTitleName.PHD_OF_SYSTEM_ANALYSIS]: 'Phd of System Analysis',
  [AcademicTitleName.PHD_OF_CYBERSECURITY]: 'Phd of Cybersecurity',
  [AcademicTitleName.PHD_OF_INFORMATION_SYSTEMS_AND_TECHNOLOGIES]:
    'Phd of Information Systems and Technologies',
  [AcademicTitleName.PHD_OF_COMPUTER_ENGINEERING]:
    'Phd of Computer Engineering',
};

export const getAcademicTitleLabel = (title: AcademicTitle) => {
  return academicTitleLabelsMap[title.name]
    ? academicTitleLabelsMap[title.name]
    : 'Unknown';
};

export const getAvailableAcademicTitles = (
  lecturer: Lecturer,
  academicTitles: AcademicTitle[],
) => {
  return difference(academicTitles, lecturer.academicTitles);
};

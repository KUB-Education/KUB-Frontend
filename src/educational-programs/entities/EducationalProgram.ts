import { SpecialityId } from '@/specialities/entities';
import { DegreeType } from './DegreeType';
import { StudyForm } from './StudyForm';
import {
  maxValueValidator,
  minValueValidator,
  requiredValidator,
} from '@/common/utils/validators.ts';

export type EducationalProgramId = number;

export type EducationalProgram = {
  id: EducationalProgramId;
  specialityId: SpecialityId;
  name: string;
  degreeType: DegreeType;
  studyForm: StudyForm;
  duration: number;
};

export const educationalProgramDurationValidator = {
  ...requiredValidator(),
  ...minValueValidator(1),
  ...maxValueValidator(10000),
};

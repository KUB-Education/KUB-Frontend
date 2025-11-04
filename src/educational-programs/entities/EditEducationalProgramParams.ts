import { DegreeType } from './DegreeType';
import { StudyForm } from './StudyForm';
import { SpecialityId } from '@/specialities/entities';
import { EducationalProgramId } from './EducationalProgram';

export type EditEducationalProgramParams = {
  id: EducationalProgramId;
  specialityId?: SpecialityId;
  name?: string;
  degreeType?: DegreeType;
  studyForm?: StudyForm;
  duration?: number;
};

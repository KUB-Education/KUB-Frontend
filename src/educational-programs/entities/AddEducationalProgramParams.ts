import { DegreeType } from './DegreeType';
import { StudyForm } from './StudyForm';
import { SpecialityId } from '@/specialities/entities';

export type AddEducationalProgramParams = {
  specialityId: SpecialityId;
  name: string;
  degreeType: DegreeType;
  studyForm: StudyForm;
  duration: number;
};

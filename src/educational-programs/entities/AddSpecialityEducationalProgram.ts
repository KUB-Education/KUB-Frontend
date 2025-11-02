import { DegreeType } from './DegreeType';
import { StudyForm } from './StudyForm';
import { SpecialityId } from '@/specialities/entities';

export type AddSpecialityEducationalProgram = {
  specialityId: SpecialityId;
  name: string;
  degreeType: DegreeType;
  studyForm: StudyForm;
  duration: number;
};

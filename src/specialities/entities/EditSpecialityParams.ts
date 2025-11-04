import { SpecialityId } from './Speciality';
import { StudyFieldId } from '@/study-fields/entities';

export type EditSpecialityParams = {
  id: SpecialityId;
  studyFieldId: StudyFieldId;
  code?: string;
  name?: string;
};

import { StudyFieldId } from '@/study-fields/entities';

export type SpecialityId = number;

export type Speciality = {
  id: SpecialityId;
  studyFieldId: StudyFieldId;
  code: string;
  name: string;
};

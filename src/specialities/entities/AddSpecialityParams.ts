import { StudyFieldId } from '@/study-fields/entities';

export type AddSpecialityParams = {
  studyFieldId: StudyFieldId;
  code: string;
  name: string;
};

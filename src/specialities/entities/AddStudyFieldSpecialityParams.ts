import { StudyFieldId } from '@/study-fields/entities';

export type AddStudyFieldSpecialityParams = {
  studyFieldId: StudyFieldId;
  code: string;
  name: string;
};

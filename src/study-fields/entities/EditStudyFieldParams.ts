import { StudyFieldId } from './StudyField';

export type EditStudyFieldParams = {
  id: StudyFieldId;
  code?: string;
  name?: string;
};

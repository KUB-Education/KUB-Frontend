import { SubjectId } from '@/subjects/entities';
import { SubjectActivityId } from './SubjectActivity';

export type DeleteSubjectActivitiesParams = {
  subjectId: SubjectId;
  subjectActivityIds: Array<SubjectActivityId>;
};

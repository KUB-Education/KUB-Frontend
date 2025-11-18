import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { SubjectId } from '@/subjects/entities';

export const getSubjectActivitiesQueryKey = (subjectId?: SubjectId) => {
  return ['subjectActivities', subjectId].filter(Boolean);
};

export type UseSubjectsByTermParams = {
  subjectId: SubjectId;
  enabled?: boolean;
};

export function useSubjectActivities(params: UseSubjectsByTermParams) {
  const { subjectActivitiesService } = useAppServices();

  const { data: subjectActivities, ...otherData } = useQuery({
    queryKey: getSubjectActivitiesQueryKey(params.subjectId),
    queryFn: () => {
      return subjectActivitiesService.getSubjectActivities(params.subjectId);
    },
    initialData: [],
    enabled: params.enabled,
  });

  return { subjectActivities, ...otherData };
}

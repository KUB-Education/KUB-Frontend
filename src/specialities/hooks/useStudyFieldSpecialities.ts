import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { StudyFieldId } from '@/study-fields/entities';

export const getStudyFieldSpecialitiesQueryKey = (
  studyFieldId?: StudyFieldId,
) => {
  return ['studyFieldSpecialitiesQuery', studyFieldId].filter(Boolean);
};

export type UseStudyFieldSpecialitiesPrams = {
  studyFieldId: StudyFieldId;
  enabled?: boolean;
};

export function useStudyFieldSpecialities(
  params: UseStudyFieldSpecialitiesPrams,
) {
  const { specialitiesService } = useAppServices();

  const { data: specialities, ...otherData } = useQuery({
    queryKey: getStudyFieldSpecialitiesQueryKey(params.studyFieldId),
    queryFn: () => {
      return specialitiesService.getStudyFieldSpecialities(params.studyFieldId);
    },
    initialData: [],
    enabled: params.enabled,
  });

  return { specialities, ...otherData };
}

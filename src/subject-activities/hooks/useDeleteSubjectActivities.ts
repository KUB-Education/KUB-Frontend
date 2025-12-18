import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { getSubjectActivitiesQueryKey } from './useSubjectActivities';
import { DeleteSubjectActivitiesParams } from '@/subject-activities/entities';

type UseDeleteSubjectActivitiesParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteSubjectActivities({
  onSuccess,
  onError,
}: UseDeleteSubjectActivitiesParams = {}) {
  const { subjectActivitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteSubjectActivities, ...otherProps } = useMutation<
    void,
    Error,
    DeleteSubjectActivitiesParams
  >({
    mutationFn: async (params) => {
      await subjectActivitiesService.deleteSubjectActivities(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getSubjectActivitiesQueryKey(),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteSubjectActivities,
    ...otherProps,
  };
}

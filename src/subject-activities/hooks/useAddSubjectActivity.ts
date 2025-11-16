import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import {
  AddSubjectActivityParams,
  SubjectActivity,
} from '@/subject-activities/entities';
import { getSubjectActivitiesQueryKey } from './useSubjectActivities';

type UseAddSubjectActivityParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddSubjectActivity({
  onSuccess,
  onError,
}: UseAddSubjectActivityParams = {}) {
  const { subjectActivitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addSubjectActivity, ...otherProps } = useMutation<
    SubjectActivity,
    Error,
    AddSubjectActivityParams
  >({
    mutationFn: async (params) => {
      return subjectActivitiesService.addSubjectActivity(params);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: getSubjectActivitiesQueryKey(data.subjectId),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    addSubjectActivity,
    ...otherProps,
  };
}

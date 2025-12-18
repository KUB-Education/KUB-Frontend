import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import {
  EditSubjectActivityParams,
  SubjectActivity,
} from '@/subject-activities/entities';
import { getSubjectActivitiesQueryKey } from './useSubjectActivities';

type UseEditSubjectActivityParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditSubjectActivity({
  onSuccess,
  onError,
}: UseEditSubjectActivityParams = {}) {
  const { subjectActivitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editSubjectActivity, ...otherProps } = useMutation<
    SubjectActivity,
    Error,
    EditSubjectActivityParams
  >({
    mutationFn: async (params) => {
      return subjectActivitiesService.editSubjectActivity(params);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: getSubjectActivitiesQueryKey(data.subjectId),
      });

      if (onSuccess) onSuccess();
    },
    onError: (error, variables, context) => {
      console.log(error, variables, context);
      if (onError) onError();
    },
  });

  return {
    editSubjectActivity,
    ...otherProps,
  };
}

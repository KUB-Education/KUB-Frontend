import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { EditSubjectParams, Subject } from '@/subjects/entities';
import { getSubjectByTermQueryKey } from './useSubjectsByTerm';

type UseEditSubjectParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditSubject({
  onSuccess,
  onError,
}: UseEditSubjectParams = {}) {
  const { subjectsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editSubject, ...otherProps } = useMutation<
    Subject,
    Error,
    EditSubjectParams
  >({
    mutationFn: async (params) => {
      return subjectsService.editSubject(params);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: getSubjectByTermQueryKey(data.termId),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    editSubject,
    ...otherProps,
  };
}

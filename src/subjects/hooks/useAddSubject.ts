import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { AddSubjectParams, Subject } from '@/subjects/entities';
import { getSubjectByTermQueryKey } from './useSubjectsByTerm';

type UseAddSubjectParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddSubject({
  onSuccess,
  onError,
}: UseAddSubjectParams = {}) {
  const { subjectsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addSubject, ...otherProps } = useMutation<
    Subject,
    Error,
    AddSubjectParams
  >({
    mutationFn: async (params) => {
      return subjectsService.addSubject(params);
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
    addSubject,
    ...otherProps,
  };
}

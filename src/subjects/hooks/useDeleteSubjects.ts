import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { DeleteSubjectsParams } from '@/subjects/entities';
import { getSubjectByTermQueryKey } from './useSubjectsByTerm';

type UseDeleteSubjectsParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteSubjects({
  onSuccess,
  onError,
}: UseDeleteSubjectsParams = {}) {
  const { subjectsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteSubjects, ...otherProps } = useMutation<
    void,
    Error,
    DeleteSubjectsParams
  >({
    mutationFn: async (params) => {
      await subjectsService.deleteSubjects(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getSubjectByTermQueryKey(),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteSubjects,
    ...otherProps,
  };
}

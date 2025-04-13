import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEPsQuery.ts';
import { EPId } from '@/educational-programs/entities';

type UseDeleteEPParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteEPs({
  onSuccess,
  onError,
}: UseDeleteEPParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteEducationalPrograms, ...otherProps } = useMutation<
    void,
    Error,
    Array<EPId>
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.deleteEducationalPrograms(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [epQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteEducationalPrograms,
    ...otherProps,
  };
}

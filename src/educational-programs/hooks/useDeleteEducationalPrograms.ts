import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalProgramsQuery.ts';
import { DeleteEducationalProgramsParams } from '@/educational-programs/entities';

type UseDeleteEducationProgramsParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteEducationPrograms({
  onSuccess,
  onError,
}: UseDeleteEducationProgramsParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: executeRequest, ...otherProps } = useMutation<
    void,
    Error,
    DeleteEducationalProgramsParams
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.deleteEducationalPrograms(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [educationalProgramsQueryKey],
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    executeRequest,
    ...otherProps,
  };
}

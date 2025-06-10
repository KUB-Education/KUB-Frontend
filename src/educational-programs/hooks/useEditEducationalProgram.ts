import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalProgramsQuery.ts';
import { EditEducationalProgramParams } from '@/educational-programs/entities';

type UseEditEducationProgramParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEditEducationProgram({
  onSuccess,
  onError,
}: UseEditEducationProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: executeRequest, ...otherProps } = useMutation<
    void,
    Error,
    EditEducationalProgramParams
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.editEducationalProgram(params);
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

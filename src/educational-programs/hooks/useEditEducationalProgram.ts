import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalProgramsQuery.ts';
import { EditEducationalProgramParams } from '@/educational-programs/entities';

type UseEditEducationalProgramParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEditEducationalProgram({
  onSuccess,
  onError,
}: UseEditEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editEducationalProgram, ...otherProps } = useMutation<
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
    editEducationalProgram,
    ...otherProps,
  };
}

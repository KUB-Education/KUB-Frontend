import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalProgramsQuery.ts';
import { AddEducationalProgramParams } from '@/educational-programs/entities';

type UseAddEducationProgramParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useAddEducationProgram({
  onSuccess,
  onError,
}: UseAddEducationProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: executeRequest, ...otherProps } = useMutation<
    void,
    Error,
    AddEducationalProgramParams
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.addEducationalProgram(params);
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

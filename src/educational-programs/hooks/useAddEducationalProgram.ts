import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEducationalProgramsQuery.ts';
import { AddEducationalProgramParams } from '@/educational-programs/entities';

type UseAddEducationalProgramParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useAddEducationalProgram({
  onSuccess,
  onError,
}: UseAddEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addEducationalProgram, ...otherProps } = useMutation<
    void,
    Error,
    AddEducationalProgramParams
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.addEducationalProgram(params);
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
    addEducationalProgram,
    ...otherProps,
  };
}

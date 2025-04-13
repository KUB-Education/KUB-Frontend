import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEPsQuery.ts';
import { AddEPParams } from '@/educational-programs/entities';

type UseAddEPParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useAddEP({
  onSuccess,
  onError,
}: UseAddEPParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addEducationalProgram, ...otherProps } = useMutation<
    void,
    Error,
    AddEPParams
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

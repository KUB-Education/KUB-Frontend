import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEPsQuery.ts';
import { EditEPParams } from '@/educational-programs/entities';

type UseEditEPParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEditEP({
  onSuccess,
  onError,
}: UseEditEPParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editEducationalProgram, ...otherProps } = useMutation<
    void,
    Error,
    EditEPParams
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.editEducationalProgram(params);
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
    editEducationalProgram,
    ...otherProps,
  };
}

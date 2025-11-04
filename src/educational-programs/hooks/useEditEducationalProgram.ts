import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalPrograms';
import {
  EditEducationalProgramParams,
  EducationalProgram,
} from '@/educational-programs/entities';

type UseEditEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditEducationalProgram({
  onSuccess,
  onError,
}: UseEditEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editEducationalProgram, ...otherProps } = useMutation<
    EducationalProgram,
    Error,
    EditEducationalProgramParams
  >({
    mutationFn: async (params) => {
      return educationalProgramsService.editEducationalProgram(params);
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

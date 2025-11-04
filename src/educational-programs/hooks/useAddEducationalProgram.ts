import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalPrograms';
import {
  AddEducationalProgramParams,
  EducationalProgram,
} from '@/educational-programs/entities';

type UseAddEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddEducationalProgram({
  onSuccess,
  onError,
}: UseAddEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addEducationalProgram, ...otherProps } = useMutation<
    EducationalProgram,
    Error,
    AddEducationalProgramParams
  >({
    mutationFn: async (params) => {
      return educationalProgramsService.addEducationalProgram(params);
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
    addEducationalProgram,
    ...otherProps,
  };
}

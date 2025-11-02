import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { educationalProgramsQueryKey } from './useEducationalPrograms';
import { getSpecialityEducationalProgramQueryKey } from './useSpecialityEducationalPrograms';
import {
  AddSpecialityEducationalProgram,
  EducationalProgram,
} from '@/educational-programs/entities';

type UseAddEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddSpecialityEducationalProgram({
  onSuccess,
  onError,
}: UseAddEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addEducationalProgram, ...otherProps } = useMutation<
    EducationalProgram,
    Error,
    AddSpecialityEducationalProgram
  >({
    mutationFn: async (params) => {
      return educationalProgramsService.addSpecialityEducationalProgram(params);
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [educationalProgramsQueryKey],
        }),
        queryClient.invalidateQueries({
          queryKey: getSpecialityEducationalProgramQueryKey(data.specialityId),
        }),
      ]);

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

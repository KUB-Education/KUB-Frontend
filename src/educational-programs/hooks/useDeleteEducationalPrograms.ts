import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEducationalProgramsQuery.ts';
import { EducationalProgramId } from '@/educational-programs/entities';

type UseDeleteEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteEducationalPrograms({
  onSuccess,
  onError,
}: UseDeleteEducationalProgramParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteEducationalPrograms, ...otherProps } = useMutation<
    void,
    Error,
    Array<EducationalProgramId>
  >({
    mutationFn: async (params) => {
      await educationalProgramsService.deleteEducationalPrograms(params);
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
    deleteEducationalPrograms,
    ...otherProps,
  };
}

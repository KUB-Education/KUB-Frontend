import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery';
import { DeleteAcademicTitleParams } from '@/lecturers/entities';

type UseDeleteAcademicTitle = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteAcademicTitle({
  onSuccess,
  onError,
}: UseDeleteAcademicTitle = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteAcademicTitle, ...otherProps } = useMutation<
    void,
    Error,
    DeleteAcademicTitleParams
  >({
    mutationFn: async (params) => {
      await lecturesService.deleteAcademicTitle(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [lecturesQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteAcademicTitle,
    ...otherProps,
  };
}

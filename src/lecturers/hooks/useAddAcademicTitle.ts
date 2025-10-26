import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery';
import { AddAcademicTitleParams } from '@/lecturers/entities';

type UseAddAcademicTitle = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddAcademicTitle({
  onSuccess,
  onError,
}: UseAddAcademicTitle = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addAcademicTitle, ...otherProps } = useMutation<
    void,
    Error,
    AddAcademicTitleParams
  >({
    mutationFn: async (params) => {
      await lecturesService.addAcademicTitle(params);
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
    addAcademicTitle,
    ...otherProps,
  };
}

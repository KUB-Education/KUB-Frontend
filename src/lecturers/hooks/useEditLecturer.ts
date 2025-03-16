import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { EditLecturerParams } from '@/lecturers/entities';

type UseEditLecturerParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEditLecturer({
  onSuccess,
  onError,
}: UseEditLecturerParams = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editLecturer, ...otherProps } = useMutation<
    void,
    Error,
    EditLecturerParams
  >({
    mutationFn: async (params) => {
      await lecturesService.editLecturer(params);
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
    editLecturer,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { AddLecturerParams } from '@/lecturers/entities';

type UseAddLecturerParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useAddLecturer({
  onSuccess,
  onError,
}: UseAddLecturerParams = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addLecturer, ...otherProps } = useMutation<
    void,
    Error,
    AddLecturerParams
  >({
    mutationFn: async (params) => {
      await lecturesService.addLecturer(params);
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
    addLecturer,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { LecturerId } from '@/lecturers/entities';

type UseDeleteLecturersParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteLecturers({
  onSuccess,
  onError,
}: UseDeleteLecturersParams = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteLecturers, ...otherProps } = useMutation<
    void,
    Error,
    Array<LecturerId>
  >({
    mutationFn: async (params) => {
      await lecturesService.deleteLecturers(params);
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
    deleteLecturers,
    ...otherProps,
  };
}

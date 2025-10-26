import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery';
import { DeleteDepartmentPositionParams } from '@/lecturers/entities';

type UseDeleteDepartmentPosition = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteDepartmentPosition({
  onSuccess,
  onError,
}: UseDeleteDepartmentPosition = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteDepartmentPosition, ...otherProps } = useMutation<
    void,
    Error,
    DeleteDepartmentPositionParams
  >({
    mutationFn: async (params) => {
      await lecturesService.deleteLecturerDepartmentPosition(params);
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
    deleteDepartmentPosition,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery';
import { EditDepartmentPositionParams } from '@/lecturers/entities';

type UseEditDepartmentPosition = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditDepartmentPosition({
  onSuccess,
  onError,
}: UseEditDepartmentPosition = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editDepartmentPosition, ...otherProps } = useMutation<
    void,
    Error,
    EditDepartmentPositionParams
  >({
    mutationFn: async (params) => {
      await lecturesService.editLecturerDepartmentPosition(params);
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
    editDepartmentPosition,
    ...otherProps,
  };
}

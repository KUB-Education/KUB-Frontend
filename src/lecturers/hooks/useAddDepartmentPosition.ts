import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturers';
import { AddDepartmentPositionParams } from '@/lecturers/entities';

type UseAddDepartmentPosition = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddDepartmentPosition({
  onSuccess,
  onError,
}: UseAddDepartmentPosition = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addDepartmentPosition, ...otherProps } = useMutation<
    void,
    Error,
    AddDepartmentPositionParams
  >({
    mutationFn: async (params) => {
      await lecturesService.addLecturerDepartmentPosition(params);
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
    addDepartmentPosition,
    ...otherProps,
  };
}

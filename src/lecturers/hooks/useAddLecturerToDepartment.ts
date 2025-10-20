import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { AddLecturerToDepartmentParams } from '@/lecturers/entities';

type UseAddLecturerToDepartment = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddLecturerToDepartment({
  onSuccess,
  onError,
}: UseAddLecturerToDepartment = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addLecturerToDepartment, ...otherProps } = useMutation<
    void,
    Error,
    AddLecturerToDepartmentParams
  >({
    mutationFn: async (params) => {
      await lecturesService.addLecturerToDepartment(params);
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
    addLecturerToDepartment,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { EditLecturerDepartmentParams } from '@/lecturers/entities';

type UseEditLecturerDepartment = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditLecturerDepartment({
  onSuccess,
  onError,
}: UseEditLecturerDepartment = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editLecturerDepartment, ...otherProps } = useMutation<
    void,
    Error,
    EditLecturerDepartmentParams
  >({
    mutationFn: async (params) => {
      await lecturesService.editLecturerDepartment(params);
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
    editLecturerDepartment,
    ...otherProps,
  };
}

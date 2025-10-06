import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useGetStudents';
import { EditStudentParams } from '@/students/entities';

type UseEditStudentParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditStudent({
  onSuccess,
  onError,
}: UseEditStudentParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editStudent, ...otherProps } = useMutation<
    void,
    Error,
    EditStudentParams
  >({
    mutationFn: async (params) => {
      await studentsService.editStudent(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [studentsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    editStudent,
    ...otherProps,
  };
}

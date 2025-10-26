import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useStudents';
import { AddStudentParams } from '@/students/entities';

type UseAddStudentParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddStudent({
  onSuccess,
  onError,
}: UseAddStudentParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addStudent, ...otherProps } = useMutation<
    void,
    Error,
    AddStudentParams
  >({
    mutationFn: async (params) => {
      await studentsService.addStudent(params);
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
    addStudent,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useStudents';
import { EditStudentEducationalProgramParams } from '@/students/entities';

type UseEditStudentEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditStudentEducationalProgram({
  onSuccess,
  onError,
}: UseEditStudentEducationalProgramParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editStudentEducationalProgram, ...otherProps } = useMutation<
    void,
    Error,
    EditStudentEducationalProgramParams
  >({
    mutationFn: async (params) => {
      await studentsService.editStudentEducationalProgram(params);
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
    editStudentEducationalProgram,
    ...otherProps,
  };
}

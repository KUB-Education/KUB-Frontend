import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useStudents';
import { AddStudentEducationalProgramParams } from '@/students/entities';

type UseAddStudentEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddStudentEducationalProgram({
  onSuccess,
  onError,
}: UseAddStudentEducationalProgramParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addStudentEducationalProgram, ...otherProps } = useMutation<
    void,
    Error,
    AddStudentEducationalProgramParams
  >({
    mutationFn: async (params) => {
      await studentsService.addStudentEducationalProgram(params);
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
    addStudentEducationalProgram,
    ...otherProps,
  };
}

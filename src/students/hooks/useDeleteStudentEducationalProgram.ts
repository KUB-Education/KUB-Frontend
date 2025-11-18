import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useStudents';
import { DeleteStudentEducationalProgramParams } from '@/students/entities';

type UseDeleteStudentEducationalProgramParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteStudentEducationalProgram({
  onSuccess,
  onError,
}: UseDeleteStudentEducationalProgramParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteStudentEducationalProgram, ...otherProps } =
    useMutation<void, Error, DeleteStudentEducationalProgramParams>({
      mutationFn: async (params) => {
        await studentsService.deleteStudentEducationalProgram(params);
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
    deleteStudentEducationalProgram,
    ...otherProps,
  };
}

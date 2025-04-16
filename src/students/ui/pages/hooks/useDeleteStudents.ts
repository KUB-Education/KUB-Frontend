import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useStudentsQuery.ts';
import { StudentId } from '@/students/ui/pages/entities';

type UseDeleteStudentsParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteStudents({
  onSuccess,
  onError,
}: UseDeleteStudentsParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteStudents, ...otherProps } = useMutation<
    void,
    Error,
    Array<StudentId>
  >({
    mutationFn: async (params) => {
      await studentsService.deleteStudents(params);
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
    deleteStudents,
    ...otherProps,
  };
}

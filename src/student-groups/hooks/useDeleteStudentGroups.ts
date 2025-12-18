import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { StudentGroupId } from '@/student-groups/entities';
import { studentGroupsQueryKey } from './useStudentGroups';

type UseDeleteStudentGroupsParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteStudentGroups({
  onSuccess,
  onError,
}: UseDeleteStudentGroupsParams = {}) {
  const { studentGroupsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteStudentGroups, ...otherProps } = useMutation<
    void,
    Error,
    Array<StudentGroupId>
  >({
    mutationFn: async (params) => {
      await studentGroupsService.deleteStudentGroups(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [studentGroupsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteStudentGroups,
    ...otherProps,
  };
}

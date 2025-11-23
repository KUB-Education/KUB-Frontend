import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentGroupsQueryKey } from './useStudentGroups';
import { AddStudentGroupParams } from '@/student-groups/entities';

type UseAddStudentGroupParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddStudentGroup({
  onSuccess,
  onError,
}: UseAddStudentGroupParams = {}) {
  const { studentGroupsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addStudentGroup, ...otherProps } = useMutation<
    void,
    Error,
    AddStudentGroupParams
  >({
    mutationFn: async (params) => {
      await studentGroupsService.addStudentGroup(params);
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
    addStudentGroup,
    ...otherProps,
  };
}

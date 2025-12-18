import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentGroupsQueryKey } from './useStudentGroups';
import { EditStudentGroupParams } from '@/student-groups/entities';

type UseEditStudentGroupParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditStudentGroup({
  onSuccess,
  onError,
}: UseEditStudentGroupParams = {}) {
  const { studentGroupsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editStudentGroup, ...otherProps } = useMutation<
    void,
    Error,
    EditStudentGroupParams
  >({
    mutationFn: async (params) => {
      await studentGroupsService.editStudentGroup(params);
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
    editStudentGroup,
    ...otherProps,
  };
}

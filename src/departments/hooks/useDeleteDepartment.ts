import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { departmentsQueryKey } from './useDepartmentsQuery.ts';
import { DepartmentId } from '@/departments/entities';

type UseDeleteDepartmentsParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useDeleteDepartment({
  onSuccess,
  onError,
}: UseDeleteDepartmentsParams = {}) {
  const { departmentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteDepartments, ...otherProps } = useMutation<
    void,
    Error,
    Array<DepartmentId>
  >({
    mutationFn: async (params) => {
      await departmentsService.deleteDepartments(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [departmentsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteDepartments,
    ...otherProps,
  };
}

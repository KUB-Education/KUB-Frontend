import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { departmentsQueryKey } from './useDepartmentsQuery.ts';
import { EditDepartmentParams } from '@/departments/entities';

type UseEditDepartmentParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditDepartment({
  onSuccess,
  onError,
}: UseEditDepartmentParams = {}) {
  const { departmentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editDepartment, ...otherProps } = useMutation<
    void,
    Error,
    EditDepartmentParams
  >({
    mutationFn: async (params) => {
      await departmentsService.editDepartment(params);
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
    editDepartment,
    ...otherProps,
  };
}

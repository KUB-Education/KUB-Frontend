import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { departmentsQueryKey } from './useDepartmentsQuery.ts';
import { AddDepartmentParams } from '@/departments/entities';

type UseAddDepartmentParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddDepartment({
  onSuccess,
  onError,
}: UseAddDepartmentParams = {}) {
  const { departmentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addDepartment, ...otherProps } = useMutation<
    void,
    Error,
    AddDepartmentParams
  >({
    mutationFn: async (params) => {
      await departmentsService.addDepartment(params);
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
    addDepartment,
    ...otherProps,
  };
}

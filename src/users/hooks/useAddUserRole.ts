import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { AddUserRoleParams } from '@/users/entities';
import { usersQueryKey } from './useUsers';

type UseAddUserRoleParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddUserRole({
  onSuccess,
  onError,
}: UseAddUserRoleParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addUserRole, ...otherProps } = useMutation<
    void,
    Error,
    AddUserRoleParams
  >({
    mutationFn: async (params) => {
      await userService.addUserRole(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [usersQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    addUserRole,
    ...otherProps,
  };
}

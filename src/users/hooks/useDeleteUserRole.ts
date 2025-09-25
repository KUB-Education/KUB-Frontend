import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { userRolesQueryKey } from './useGetUserRoles';
import { DeleteUserRoleParams } from '@/users/entities';

type UseDeleteUserRoleParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteUserRole({
  onSuccess,
  onError,
}: UseDeleteUserRoleParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteUserRole, ...otherProps } = useMutation<
    void,
    Error,
    DeleteUserRoleParams
  >({
    mutationFn: async (params) => {
      await userService.deleteUserRole(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userRolesQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteUserRole,
    ...otherProps,
  };
}

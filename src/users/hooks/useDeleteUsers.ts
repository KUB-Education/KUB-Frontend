import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { usersQueryKey } from './useUsersQuery';
import { UserId } from '@/users/entities';

type UseDeleteUserParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteUsers({
  onSuccess,
  onError,
}: UseDeleteUserParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteUsers, ...otherProps } = useMutation<
    void,
    Error,
    Array<UserId>
  >({
    mutationFn: async (params) => {
      await userService.deleteUsers(params);
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
    deleteUsers,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { usersQueryKey } from './useUsers';
import { AddUserParams } from '@/users/entities';

type UseAddUserParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddUser({ onSuccess, onError }: UseAddUserParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addUser, ...otherProps } = useMutation<
    void,
    Error,
    AddUserParams
  >({
    mutationFn: async (params) => {
      await userService.addUser(params);
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
    addUser,
    ...otherProps,
  };
}

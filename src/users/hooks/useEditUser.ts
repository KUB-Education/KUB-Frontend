import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { usersQueryKey } from './useUsers';
import { EditUserParams } from '@/users/entities';

type UseEditUserParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditUser({ onSuccess, onError }: UseEditUserParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editUser, ...otherProps } = useMutation<
    void,
    Error,
    EditUserParams
  >({
    mutationFn: async (params) => {
      await userService.editUser(params);
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
    editUser,
    ...otherProps,
  };
}

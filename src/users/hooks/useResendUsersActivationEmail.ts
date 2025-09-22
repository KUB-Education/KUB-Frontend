import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { usersQueryKey } from './useUsersQuery';
import { UserId } from '@/users/entities';

type UseResendUsersActivationEmailParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useResendUsersActivationEmail({
  onSuccess,
  onError,
}: UseResendUsersActivationEmailParams = {}) {
  const { userService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: resendUsersActivationEmail, ...otherProps } = useMutation<
    void,
    Error,
    Array<UserId>
  >({
    mutationFn: async (params) => {
      await userService.resendUsersActivationEmail(params);
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
    resendUsersActivationEmail,
    ...otherProps,
  };
}

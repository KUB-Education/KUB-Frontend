import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { isAuthorizedQueryKey } from './useIsAuthorized';

type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
};

type UseChangePasswordParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useChangePassword({
  onSuccess,
  onError,
}: UseChangePasswordParams = {}) {
  const { authService } = useAppServices();
  const queryClient = useQueryClient();

  const { mutate: changePassword, ...otherProps } = useMutation<
    void,
    Error,
    ChangePasswordParams
  >({
    mutationFn: async (params) => {
      await authService.changePassword(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [isAuthorizedQueryKey] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    changePassword,
    ...otherProps,
  };
}

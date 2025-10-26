import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { isAuthorizedQueryKey } from './useIsAuthorized';

type UseLogoutParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useLogout({ onSuccess, onError }: UseLogoutParams = {}) {
  const { authService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: logout, ...otherProps } = useMutation<void, Error, void>({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [isAuthorizedQueryKey] }),
        queryClient.resetQueries(),
      ]);

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    logout,
    ...otherProps,
  };
}

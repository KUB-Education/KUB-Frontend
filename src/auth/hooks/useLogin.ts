import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginParams } from '@/auth/entities';
import { useAppServices } from '@/app/hooks';
import { isAuthorizedQueryKey } from './useIsAuthorizedQuery.ts';

type UseLoginParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useLogin({ onSuccess, onError }: UseLoginParams = {}) {
  const { authService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: login, ...otherProps } = useMutation<
    void,
    Error,
    LoginParams
  >({
    mutationFn: async (params) => {
      await authService.login(params);
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
    login,
    ...otherProps,
  };
}

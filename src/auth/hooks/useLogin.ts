import { useMutation } from '@tanstack/react-query';
import { LoginParams } from '@/auth/entities';
import { useAppServices } from '@/app/hooks';

type UseLoginParams = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useLogin({ onSuccess, onError }: UseLoginParams = {}) {
  const { authService } = useAppServices();

  const { mutate: login, ...otherProps } = useMutation<
    void,
    Error,
    LoginParams
  >({
    mutationFn: async (params) => {
      await authService.login(params);
    },
    onSuccess,
    onError,
  });

  return {
    login,
    ...otherProps,
  };
}

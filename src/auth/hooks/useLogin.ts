import { useMutation } from '@tanstack/react-query';
import { LoginParams } from '@/auth/entities';
import { useAppServices } from '@/app/hooks';

export function useLogin() {
  const { authService } = useAppServices();

  const { mutate: login, ...otherProps } = useMutation<
    void,
    Error,
    LoginParams
  >({
    mutationFn: async (params) => {
      await authService.login(params);
    },
  });

  return {
    login,
    ...otherProps,
  };
}

import { useMutation } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';

type ResetPasswordParams = {
  email: string;
};

type UseResetPasswordParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useResetPassword({ onSuccess, onError }: UseResetPasswordParams = {}) {
  const { authService } = useAppServices();

  const { mutate: resetPassword, ...otherProps } = useMutation<
    void,
    Error,
    ResetPasswordParams
  >({
    mutationFn: async (params) => {
      await authService.resetPassword(params);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    resetPassword,
    ...otherProps,
  };
}

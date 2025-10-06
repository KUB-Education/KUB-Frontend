import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studentsQueryKey } from './useGetStudents';
import { UserId } from '@/users/entities';

type UseResendStudentsActivationEmailParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useResendStudentsActivationEmail({
  onSuccess,
  onError,
}: UseResendStudentsActivationEmailParams = {}) {
  const { studentsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: resendStudentsActivationEmail, ...otherProps } = useMutation<
    void,
    Error,
    Array<UserId>
  >({
    mutationFn: async (params) => {
      await studentsService.resendStudentsActivationEmail(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [studentsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    resendStudentsActivationEmail,
    ...otherProps,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { lecturesQueryKey } from './useLecturersQuery.ts';
import { LecturerId } from '@/lecturers/entities';

type UseResendLecturersInvitesParams = Partial<{
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useResendLecturersInvites({
  onSuccess,
  onError,
}: UseResendLecturersInvitesParams = {}) {
  const { lecturesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: resendLecturersInvites, ...otherProps } = useMutation<
    void,
    Error,
    Array<LecturerId>
  >({
    mutationFn: async (params) => {
      await lecturesService.resendInvites(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [lecturesQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    resendLecturersInvites,
    ...otherProps,
  };
}

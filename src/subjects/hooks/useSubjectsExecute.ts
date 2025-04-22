import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { subjectsQueryKey } from './useSubjectsQuery.ts';

type UseSubjectsExecuteParams = Partial<{
  serviceFunction: string;
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useSubjectsExecute<TParams>({
  serviceFunction,
  onSuccess,
  onError,
}: UseSubjectsExecuteParams = {}) {
  const { subjectsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: executeRequest, ...otherProps } = useMutation<
    void,
    Error,
    TParams
  >({
    mutationFn: async (params) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (subjectsService  as any)[serviceFunction!](params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [subjectsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    executeRequest,
    ...otherProps,
  };
}

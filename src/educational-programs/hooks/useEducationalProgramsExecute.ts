import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { epQueryKey } from './useEducationalProgramsQuery.ts';

type UseEducationalProgramsExecuteParams = Partial<{
  serviceFunction: string;
  onSuccess?: () => void;
  onError?: () => void;
}>;

export function useEducationalProgramsExecute<TParams>({
  serviceFunction,
  onSuccess,
  onError,
}: UseEducationalProgramsExecuteParams = {}) {
  const { educationalProgramsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: executeRequest, ...otherProps } = useMutation<
    void,
    Error,
    TParams
  >({
    mutationFn: async (params) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (educationalProgramsService  as any)[serviceFunction!](params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [epQueryKey] });

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

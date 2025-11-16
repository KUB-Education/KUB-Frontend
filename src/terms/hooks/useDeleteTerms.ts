import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { DeleteTermParams } from '@/terms/entities';
import { getTermsQueryKey } from './useTerms';

type UseDeleteTermsParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteTerms({
  onSuccess,
  onError,
}: UseDeleteTermsParams = {}) {
  const { termsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteTerms, ...otherProps } = useMutation<
    void,
    Error,
    DeleteTermParams
  >({
    mutationFn: async (params) => {
      await termsService.deleteTerms(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getTermsQueryKey(),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteTerms,
    ...otherProps,
  };
}

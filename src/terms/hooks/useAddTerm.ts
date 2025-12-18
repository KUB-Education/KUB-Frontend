import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { AddTermParams, Term } from '@/terms/entities';
import { getTermsQueryKey } from './useTerms';

type UseAddTermParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddTerm({ onSuccess, onError }: UseAddTermParams = {}) {
  const { termsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addTerm, ...otherProps } = useMutation<
    Term,
    Error,
    AddTermParams
  >({
    mutationFn: async (params) => {
      return termsService.addTerm(params);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: getTermsQueryKey(data.educationalProgramId),
      });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    addTerm,
    ...otherProps,
  };
}

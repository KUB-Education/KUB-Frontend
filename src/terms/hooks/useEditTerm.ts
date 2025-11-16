import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { EditTermParams, Term } from '@/terms/entities';
import { getTermsQueryKey } from './useTerms';

type UseEditTermParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditTerm({ onSuccess, onError }: UseEditTermParams = {}) {
  const { termsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editTerm, ...otherProps } = useMutation<
    Term,
    Error,
    EditTermParams
  >({
    mutationFn: async (params) => {
      return termsService.editTerm(params);
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
    editTerm,
    ...otherProps,
  };
}

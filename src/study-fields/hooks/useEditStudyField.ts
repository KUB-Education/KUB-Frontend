import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studyFieldsQueryKey } from './useStudyFields';
import { EditStudyFieldParams } from '@/study-fields/entities';

type UseEditStudyFieldParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditStudyField({
  onSuccess,
  onError,
}: UseEditStudyFieldParams = {}) {
  const { studyFieldsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editStudyField, ...otherProps } = useMutation<
    void,
    Error,
    EditStudyFieldParams
  >({
    mutationFn: async (params) => {
      await studyFieldsService.editStudyField(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [studyFieldsQueryKey] });

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    editStudyField,
    ...otherProps,
  };
}

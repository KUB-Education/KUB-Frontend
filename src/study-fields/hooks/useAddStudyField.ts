import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studyFieldsQueryKey } from './useStudyFields';
import { AddStudyFieldParams } from '@/study-fields/entities';

type UseAddUserParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddStudyField({
  onSuccess,
  onError,
}: UseAddUserParams = {}) {
  const { studyFieldsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addStudyField, ...otherProps } = useMutation<
    void,
    Error,
    AddStudyFieldParams
  >({
    mutationFn: async (params) => {
      await studyFieldsService.addStudyField(params);
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
    addStudyField,
    ...otherProps,
  };
}

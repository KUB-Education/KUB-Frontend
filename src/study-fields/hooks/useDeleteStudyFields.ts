import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { studyFieldsQueryKey } from './useStudyFields';
import { StudyFieldId } from '@/study-fields/entities';

type UseDeleteStudyFieldsParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteStudyFields({
  onSuccess,
  onError,
}: UseDeleteStudyFieldsParams = {}) {
  const { studyFieldsService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteStudyFields, ...otherProps } = useMutation<
    void,
    Error,
    Array<StudyFieldId>
  >({
    mutationFn: async (params) => {
      await studyFieldsService.deleteStudyFields(params);
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
    deleteStudyFields,
    ...otherProps,
  };
}

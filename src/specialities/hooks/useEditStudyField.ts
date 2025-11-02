import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { specialitiesQueryKey } from './useSpecialities';
import { EditSpecialityParams, Speciality } from '@/specialities/entities';
import { getStudyFieldSpecialitiesQueryKey } from './useStudyFieldSpecialities';

type UseEditSpecialityParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useEditSpeciality({
  onSuccess,
  onError,
}: UseEditSpecialityParams = {}) {
  const { specialitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: editSpeciality, ...otherProps } = useMutation<
    Speciality,
    Error,
    EditSpecialityParams
  >({
    mutationFn: async (params) => {
      return await specialitiesService.editSpeciality(params);
    },
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [specialitiesQueryKey] }),
        queryClient.invalidateQueries({
          queryKey: getStudyFieldSpecialitiesQueryKey(data.studyFieldId),
        }),
      ]);

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    editSpeciality,
    ...otherProps,
  };
}

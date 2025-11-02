import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { specialitiesQueryKey } from './useSpecialities';
import {
  AddStudyFieldSpecialityParams,
  Speciality,
} from '@/specialities/entities';
import { getStudyFieldSpecialitiesQueryKey } from './useStudyFieldSpecialities';

type UseAddStudyFieldSpecialityParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddStudyFieldSpeciality({
  onSuccess,
  onError,
}: UseAddStudyFieldSpecialityParams = {}) {
  const { specialitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addSpeciality, ...otherProps } = useMutation<
    Speciality,
    Error,
    AddStudyFieldSpecialityParams
  >({
    mutationFn: async (params) => {
      return specialitiesService.addStudyFieldSpeciality(params);
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
    addSpeciality,
    ...otherProps,
  };
}

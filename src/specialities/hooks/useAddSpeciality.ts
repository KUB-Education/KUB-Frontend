import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { specialitiesQueryKey } from './useSpecialities';
import { AddSpecialityParams, Speciality } from '@/specialities/entities';

type UseAddSpecialityParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useAddSpeciality({
  onSuccess,
  onError,
}: UseAddSpecialityParams = {}) {
  const { specialitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: addSpeciality, ...otherProps } = useMutation<
    Speciality,
    Error,
    AddSpecialityParams
  >({
    mutationFn: async (params) => {
      return specialitiesService.addSpeciality(params);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [specialitiesQueryKey] });

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

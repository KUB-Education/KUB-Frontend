import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppServices } from '@/app/hooks';
import { specialitiesQueryKey } from './useSpecialities';
import { SpecialityId } from '@/specialities/entities';
import { getStudyFieldSpecialitiesQueryKey } from './useStudyFieldSpecialities';

type UseDeleteSpecialitiesParams = Partial<{
  onSuccess: () => void;
  onError: () => void;
}>;

export function useDeleteSpecialities({
  onSuccess,
  onError,
}: UseDeleteSpecialitiesParams = {}) {
  const { specialitiesService } = useAppServices();

  const queryClient = useQueryClient();

  const { mutate: deleteSpecialities, ...otherProps } = useMutation<
    void,
    Error,
    Array<SpecialityId>
  >({
    mutationFn: async (params) => {
      await specialitiesService.deleteSpecialities(params);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [specialitiesQueryKey] }),
        queryClient.invalidateQueries({
          queryKey: getStudyFieldSpecialitiesQueryKey(),
        }),
      ]);

      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    deleteSpecialities,
    ...otherProps,
  };
}

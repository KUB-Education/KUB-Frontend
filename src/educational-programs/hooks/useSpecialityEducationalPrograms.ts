import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { SpecialityId } from '@/specialities/entities';

export const getSpecialityEducationalProgramQueryKey = (
  specialityId?: SpecialityId,
) => {
  return ['specialityEducationalProgramQuery', specialityId].filter(Boolean);
};

export type UseSpecialityEducationalProgramsParams = {
  specialityId: SpecialityId;
  enabled?: boolean;
};

export function useSpecialityEducationalPrograms(
  params: UseSpecialityEducationalProgramsParams,
) {
  const { educationalProgramsService } = useAppServices();

  const { data: educationalPrograms, ...otherData } = useQuery({
    queryKey: getSpecialityEducationalProgramQueryKey(params.specialityId),
    queryFn: async () => {
      return await educationalProgramsService.getSpecialityEducationalPrograms(
        params.specialityId,
      );
    },
    initialData: [],
    enabled: params.enabled,
  });

  return { educationalPrograms, ...otherData };
}

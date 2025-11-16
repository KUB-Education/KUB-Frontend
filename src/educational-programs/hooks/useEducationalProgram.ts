import { EducationalProgramId } from '@/educational-programs/entities';
import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const getEducationalProgramQueryKey = (
  educationalProgramId?: EducationalProgramId,
) => {
  return ['educationalProgram', educationalProgramId].filter(Boolean);
};

export type UseEducationalProgramParams = {
  educationalProgramId: EducationalProgramId;
  enabled?: boolean;
};

export function useEducationalProgram(params: UseEducationalProgramParams) {
  const { educationalProgramsService } = useAppServices();

  const { data: educationalProgram, ...otherData } = useQuery({
    queryKey: getEducationalProgramQueryKey(params.educationalProgramId),
    queryFn: async () => {
      return await educationalProgramsService.getEducationalProgram(
        params.educationalProgramId,
      );
    },
    initialData: null,
    enabled: params.enabled,
  });

  return { educationalProgram, ...otherData };
}

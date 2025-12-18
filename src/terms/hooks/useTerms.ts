import { EducationalProgramId } from '@/educational-programs/entities';
import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const getTermsQueryKey = (
  educationalProgramId?: EducationalProgramId,
) => {
  return ['termsQuery', educationalProgramId].filter(Boolean);
};

export type UseTermsParams = {
  educationalProgramId: EducationalProgramId;
  enabled?: boolean;
};

export function useTerms(params: UseTermsParams) {
  const { termsService } = useAppServices();

  const { data: terms, ...otherData } = useQuery({
    queryKey: getTermsQueryKey(params.educationalProgramId),
    queryFn: () => {
      return termsService.getTerms(params.educationalProgramId);
    },
    initialData: [],
    enabled: params.enabled,
  });

  return { terms, ...otherData };
}

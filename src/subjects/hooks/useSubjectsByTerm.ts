import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { TermId } from '@/terms/entities';

export const getSubjectByTermQueryKey = (termId?: TermId) => {
  return ['subjectsByTerm', termId].filter(Boolean);
};

export type UseSubjectsByTermParams = {
  termId: TermId;
  enabled?: boolean;
};

export function useSubjectsByTerm(params: UseSubjectsByTermParams) {
  const { subjectsService } = useAppServices();

  const { data: subjects, ...otherData } = useQuery({
    queryKey: getSubjectByTermQueryKey(params.termId),
    queryFn: () => {
      return subjectsService.getSubjectsByTerm(params.termId);
    },
    initialData: [],
    enabled: params.enabled,
  });

  return { subjects, ...otherData };
}

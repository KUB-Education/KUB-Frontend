import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const subjectsQueryKey = 'subjectsQuery';

export function useSubjectsQuery() {
  const { subjectsService } = useAppServices();

  const { data: subjects, ...otherData } = useQuery({
    queryKey: [subjectsQueryKey],
    queryFn: async () => {
      const result = await subjectsService.getSubjects();
      
      return result;
    },
    initialData: [],
  });

  return { subjects, ...otherData };
}

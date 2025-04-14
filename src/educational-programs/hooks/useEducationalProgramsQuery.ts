import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const epQueryKey = 'educationalProgramsQuery';

export function useEducationalProgramsQuery() {
  const { educationalProgramsService: epService } = useAppServices();

  const { data: educationalPrograms, ...otherData } = useQuery({
    queryKey: [epQueryKey],
    queryFn: async () => {
      const result = await epService.getEducationalPrograms();

      return result;
    },
    initialData: [],
  });

  return { educationalPrograms, ...otherData };
}

import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const epQueryKey = 'educationalProgramsQuery';

export function useEducationalProgramsQuery() {
  const { educationalProgramsService } = useAppServices();

  const { data: educationalPrograms, ...otherData } = useQuery({
    queryKey: [epQueryKey],
    queryFn: async () => {
      return await educationalProgramsService.getEducationalPrograms();
    },
    initialData: [],
  });

  return { educationalPrograms, ...otherData };
}

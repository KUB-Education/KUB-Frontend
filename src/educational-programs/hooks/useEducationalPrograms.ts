import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const epQueryKey = 'educationalProgramsQuery';

export function useEducationalPrograms() {
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

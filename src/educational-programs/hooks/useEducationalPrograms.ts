import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const educationalProgramsQueryKey = 'educationalProgramsQuery';

export function useEducationalPrograms() {
  const { educationalProgramsService } = useAppServices();

  const { data: educationalPrograms, ...otherData } = useQuery({
    queryKey: [educationalProgramsQueryKey],
    queryFn: async () => {
      return await educationalProgramsService.getEducationalPrograms();
    },
    initialData: [],
  });

  return { educationalPrograms, ...otherData };
}

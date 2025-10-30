import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const academicTitlesQueryKey = 'academicTitlesQuery';

export function useAcademicTitles() {
  const { lecturesService } = useAppServices();

  const { data: academicTitles, ...otherData } = useQuery({
    queryKey: [academicTitlesQueryKey],
    queryFn: () => {
      return lecturesService.getAcademicTitles();
    },
    initialData: [],
  });

  return { academicTitles, ...otherData };
}

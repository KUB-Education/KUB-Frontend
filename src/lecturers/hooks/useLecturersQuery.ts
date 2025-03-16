import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const lecturesQueryKey = 'lecturesQuery';

export function useLecturersQuery() {
  const { lecturesService } = useAppServices();

  const { data: lecturers, ...otherData } = useQuery({
    queryKey: [lecturesQueryKey],
    queryFn: () => {
      return lecturesService.getLecturers();
    },
    initialData: [],
  });

  return { lecturers, ...otherData };
}

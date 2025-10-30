import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const studentsQueryKey = 'studentsQuery';

export function useStudents() {
  const { studentsService } = useAppServices();

  const { data: students, ...otherData } = useQuery({
    queryKey: [studentsQueryKey],
    queryFn: () => {
      return studentsService.getStudents();
    },
    initialData: [],
  });

  return { students, ...otherData };
}

import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const departmentsQueryKey = 'departmentsQuery';

export function useDepartments() {
  const { departmentsService } = useAppServices();

  const { data: departments, ...otherData } = useQuery({
    queryKey: [departmentsQueryKey],
    queryFn: () => {
      return departmentsService.getDepartments();
    },
    initialData: [],
  });

  return { departments, ...otherData };
}

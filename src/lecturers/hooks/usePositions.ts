import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const positionsQueryKey = 'positionsQuery';

export function usePositions() {
  const { lecturesService } = useAppServices();

  const { data: positions, ...otherData } = useQuery({
    queryKey: [positionsQueryKey],
    queryFn: () => {
      return lecturesService.getPositions();
    },
    initialData: [],
  });

  return { positions, ...otherData };
}

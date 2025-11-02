import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const specialitiesQueryKey = 'specialitiesQuery';

export function useSpecialities() {
  const { specialitiesService } = useAppServices();

  const { data: specialities, ...otherData } = useQuery({
    queryKey: [specialitiesQueryKey],
    queryFn: () => {
      return specialitiesService.getSpecialities();
    },
    initialData: [],
  });

  return { specialities, ...otherData };
}

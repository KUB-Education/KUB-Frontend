import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const isAuthorizedQueryKey = 'isAuthorizedQuery';

export function useIsAuthorizedQuery() {
  const { authService } = useAppServices();

  const { data: isAuthorized, ...otherData } = useQuery({
    queryKey: [isAuthorizedQueryKey],
    queryFn: () => {
      return authService.getIsAuthorized();
    },
  });

  return { isAuthorized, ...otherData };
}

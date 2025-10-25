import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { useIsAuthorizedQuery } from '@/auth/hooks';

export const currentUserQueryKey = 'currentUserQuery';

export function useCurrentUserQuery() {
  const { currentUserService } = useAppServices();
  const { isAuthorized } = useIsAuthorizedQuery();

  const { data: currentUser, ...otherData } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: () => {
      return currentUserService.getCurrentUser();
    },
    enabled: isAuthorized,
  });

  return { currentUser, ...otherData };
}

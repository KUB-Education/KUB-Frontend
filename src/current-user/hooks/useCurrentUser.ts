import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { useIsAuthorized } from '@/auth/hooks';

export const currentUserQueryKey = 'currentUserQuery';

export function useCurrentUser() {
  const { currentUserService } = useAppServices();
  const { isAuthorized } = useIsAuthorized();

  const { data: currentUser, ...otherData } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: () => {
      return currentUserService.getCurrentUser();
    },
    enabled: isAuthorized,
  });

  return { currentUser, ...otherData };
}

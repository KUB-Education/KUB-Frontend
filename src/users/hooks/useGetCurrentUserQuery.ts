import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { useIsAuthorizedQuery } from '@/auth/hooks';

export const currentUserQueryKey = 'currentUserQuery';

export function useGetCurrentUserQuery() {
  const { userService } = useAppServices();
  const { isAuthorized } = useIsAuthorizedQuery();

  const { data: currentUser, ...otherData } = useQuery({
    queryKey: [currentUserQueryKey],
    queryFn: () => {
      return userService.getCurrentUser();
    },
    enabled: isAuthorized,
  });

  return { currentUser, ...otherData };
}

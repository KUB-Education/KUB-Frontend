import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { useIsAuthorizedQuery } from '@/auth/hooks';

export const userProfileQueryKey = 'userProfileQuery';

export function useUserProfileQuery() {
  const { userService } = useAppServices();
  const { isAuthorized } = useIsAuthorizedQuery();

  const { data: userProfile, ...otherData } = useQuery({
    queryKey: [userProfileQueryKey],
    queryFn: () => {
      return userService.getProfile();
    },
    enabled: isAuthorized,
  });

  return { userProfile, ...otherData };
}

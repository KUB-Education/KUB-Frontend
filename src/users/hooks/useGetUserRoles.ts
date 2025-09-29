import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';
import { UserId } from '@/users/entities';

export const userRolesQueryKey = 'userRolesQuery';

export function useGetUserRoles(userId: UserId) {
  const { userService } = useAppServices();

  const { data: userRoles, ...otherData } = useQuery({
    queryKey: [userRolesQueryKey],
    queryFn: () => {
      return userService.getUserRoles(userId);
    },
    initialData: [],
  });

  return { userRoles, ...otherData };
}

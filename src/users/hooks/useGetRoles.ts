import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const rolesQueryKey = 'rolesQuery';

export function useGetRoles() {
  const { userService } = useAppServices();

  const { data: roles, ...otherData } = useQuery({
    queryKey: [rolesQueryKey],
    queryFn: () => {
      return userService.getRoles();
    },
    initialData: [],
  });

  return { roles, ...otherData };
}

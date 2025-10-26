import { useAppServices } from '@/app/hooks';
import { useQuery } from '@tanstack/react-query';

export const usersQueryKey = 'usersQuery';

export function useUsers() {
  const { userService } = useAppServices();

  const { data: users, ...otherData } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: () => {
      return userService.getUsers();
    },
    initialData: [],
  });

  return { users, ...otherData };
}

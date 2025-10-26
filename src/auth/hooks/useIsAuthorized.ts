import { useAppServices } from '@/app/hooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const isAuthorizedQueryKey = 'isAuthorizedQuery';

export function useIsAuthorized() {
  const { authService } = useAppServices();
  const queryClient = useQueryClient();

  useEffect(() => {
    authService.onUnauthorized(async () => {
      await queryClient.invalidateQueries({ queryKey: [isAuthorizedQueryKey] });
    });
  }, [queryClient, authService]);

  const { data: isAuthorized, ...otherData } = useQuery({
    queryKey: [isAuthorizedQueryKey],
    queryFn: () => {
      return authService.getIsAuthorized();
    },
  });

  return { isAuthorized, ...otherData };
}

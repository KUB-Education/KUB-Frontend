import { useMemo } from 'react';

export function useIsAuthorized() {
  const isAuthorized = useMemo(() => {
    return true;
  }, []);

  return { isAuthorized };
}

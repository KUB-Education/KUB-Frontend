import { useServices } from '@/common/hooks';
import { AppServices } from '../entites';

export function useAppServices() {
  return useServices<AppServices>();
}

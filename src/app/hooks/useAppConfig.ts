import { useConfig } from '@/common/hooks';
import { AppConfig } from '../entites';

export function useAppConfig() {
  return useConfig<AppConfig>();
}

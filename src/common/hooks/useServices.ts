import { useContext } from 'react';
import { ServicesContext } from '@/common/contexts';
import { BaseService } from '@/common/services';

export function useServices<T extends Record<string, BaseService>>() {
  return useContext(ServicesContext) as T;
}

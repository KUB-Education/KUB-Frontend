import { useContext } from 'react';
import { ConfigContext } from '../contexts';

export function useConfig<T extends Record<string, unknown>>() {
  return useContext(ConfigContext) as T;
}

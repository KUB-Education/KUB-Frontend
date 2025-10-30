import { differenceWith } from 'lodash-es';
import { isEqual } from './equal.ts';

export const difference = <T1, T2>(
  arr1: ArrayLike<T1> | null | undefined,
  arr2: ArrayLike<T2>,
): T1[] => {
  return differenceWith<T1, T2>(arr1, arr2, isEqual);
};

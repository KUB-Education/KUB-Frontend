import { SECOND } from './date.ts';

export const delay = async (delayTime = SECOND) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, delayTime);
  });
};

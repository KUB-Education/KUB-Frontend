import { UnknownError } from '../errors';

export function normalizeError(err: unknown): Error {
  return err instanceof Error ? err : new UnknownError(err);
}

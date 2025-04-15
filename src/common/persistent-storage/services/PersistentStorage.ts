export class PersistentStorage {
  get<T>(key: string, { raw = false } = {}): T | null | string {
    if (!key) throw new Error('storage key may not be falsy');

    try {
      const localStorageValue = localStorage.getItem(key);

      if (localStorageValue === null || raw) {
        return localStorageValue as T;
      }

      try {
        return JSON.parse(localStorageValue);
      } catch {
        return localStorageValue as T;
      }
    } catch (err) {
      console.warn(`Can't load value from persistent store for key: ${key}`);
      throw err;
    }
  }

  set(key: string, newVal: unknown): void {
    if (typeof newVal === 'undefined') return;

    try {
      const value =
        typeof newVal === 'string' ? newVal : JSON.stringify(newVal);

      localStorage.setItem(key, value);
    } catch (err) {
      console.warn(`Can't load value from persistent store for key: ${key}`);
      throw err;
    }
  }
}

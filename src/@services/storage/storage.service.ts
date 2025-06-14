import { type Currency, type LoginResponse, ThemeType } from '../api';
import { defaultAppStorage } from './storage.const';
import { type AppStorage, DefaultReturn } from './storage.types';

class StorageService {
  set(key: keyof AppStorage, value: DefaultReturn): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  setFilters<T>(key: string, update: T) {
    const params = new URLSearchParams(update as Record<string, string>);
    this.set('filters', {
      ...storageService.get('filters'),
      [key]: params.toString(),
    });
  }

  reset(key: keyof AppStorage): void {
    this.set(key, defaultAppStorage[key]);
  }

  get(key: 'currency'): Currency;
  get(key: 'user'): LoginResponse;
  get(key: 'theme'): ThemeType;
  get(key: 'filters'): Record<string, string>;
  get(key: keyof AppStorage): DefaultReturn {
    const item = localStorage.getItem(key);
    if (item !== null && item !== undefined)
      return JSON.parse(item) as DefaultReturn;
    this.set(key, defaultAppStorage[key]);
    return defaultAppStorage[key];
  }
}

const storageService = new StorageService();

export default storageService;

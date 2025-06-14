import { type Currency, type LoginResponse, ThemeType } from '../api';

export interface AppStorage {
  currency: Currency;
  user: LoginResponse;
  theme: ThemeType;
  filters: Record<string, string>;
}

export type DefaultReturn = AppStorage[keyof AppStorage];

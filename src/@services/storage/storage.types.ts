import { Currency, ThemeType } from '@root/types';

import { type LoginResponse } from '../api';

export interface AppStorage {
  currency: Currency;
  user: LoginResponse;
  theme: ThemeType;
  filters: Record<string, string>;
}

export type DefaultReturn = AppStorage[keyof AppStorage];

import { type Currency, type ThemeType } from '@root/types';
import { type Language } from '@translations';

import { type LoginResponse } from '../api';

export interface AppStorage {
  currency: Currency;
  user: LoginResponse;
  theme: ThemeType;
  filters: Record<string, string>;
  savedSimulation: number;
  language: Language;
}

export type DefaultReturn = AppStorage[keyof AppStorage];

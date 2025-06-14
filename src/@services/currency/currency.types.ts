import { type ReactNode } from 'react';

export interface CurrencyData {
  name: string;
  symbol: string;
  flag: string;
  element?: ReactNode;
}

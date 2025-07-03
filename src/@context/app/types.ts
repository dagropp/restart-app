import { Currency, ThemeType } from '@root/types';
import { type CurrencyList } from '@services/api';

export interface IAppContext {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencies: CurrencyList;
  isLoggedIn: LoginState;
  setIsLoggedIn: (value: LoginState) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export enum LoginState {
  Invalid,
  Pending,
  Valid,
}

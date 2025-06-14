import { type Currency, type CurrencyList, ThemeType } from '@services/api';

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

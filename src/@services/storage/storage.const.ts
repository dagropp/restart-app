import { Currency, IncomeType, ThemeType, UserType } from '@root/types';

import { type AppStorage } from './storage.types';

export const defaultAppStorage: AppStorage = {
  currency: Currency.ILS,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    sessionId: '',
    citizenship: [],
    income: IncomeType.None,
    type: UserType.Standard,
    incomeMark: 0,
    groupId: '',
    dateOfBirth: '',
    stipendValue: null,
    stipendCurrency: null,
    incomeRemote: null,
  },
  theme: ThemeType.System,
  filters: {},
  savedSimulation: -1,
  language: 'he',
};

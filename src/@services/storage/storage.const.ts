import { type AppStorage } from './storage.types';

export const defaultAppStorage = {
  currency: 'ILS',
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    sessionId: '',
    citizenship: [],
    income: 'None',
    type: 'Standard',
    incomeMark: 0,
    groupId: '',
    dateOfBirth: '',
    stipendValue: null,
    stipendCurrency: null,
    incomeRemote: null,
  },
  theme: 'System',
  filters: {},
} as AppStorage;

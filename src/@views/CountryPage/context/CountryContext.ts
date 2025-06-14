import { createContext } from 'react';

import { ICountriesContext } from './types';

export const CountryContext = createContext({} as ICountriesContext);

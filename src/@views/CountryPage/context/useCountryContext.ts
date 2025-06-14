import { useContext } from 'react';

import { CountryContext } from './CountryContext';

export const useCountryContext = () => useContext(CountryContext);

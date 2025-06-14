import { createContext } from 'react';

import { type IFiltersContext } from './types';

export const FiltersContext = createContext<IFiltersContext<object>>(
  {} as IFiltersContext<object>,
);

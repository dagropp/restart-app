import { useContext } from 'react';

import { FiltersContext } from './FiltersContext';
import { IFiltersContext } from './types';

export const useFiltersContext = <T extends object>(): IFiltersContext<T> =>
  useContext(FiltersContext) as IFiltersContext<T>;

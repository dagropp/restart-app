import { IFiltersContext } from '@views/Countries/components/Filters/types';
import { createContext } from 'react';

export const FiltersContext = createContext<IFiltersContext>(
  {} as IFiltersContext,
);

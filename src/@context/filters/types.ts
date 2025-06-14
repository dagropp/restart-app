import { ReactNode } from 'react';

export interface IFiltersContext<T extends object> {
  filters: T;
  updateFilters: (value: Partial<T>) => void;
  resetFilters: () => void;
  isFiltered: boolean;
}

export interface FilterContextWrapperProps<T extends object>
  extends IFiltersContext<T> {
  children: ReactNode;
}

import { FiltersContext } from './FiltersContext';
import { FilterContextWrapperProps } from './types';

export const FiltersContextWrapper = <T extends object>({
  children,
  ...value
}: FilterContextWrapperProps<T>) => {
  return <FiltersContext value={value}>{children}</FiltersContext>;
};

import { useFiltersContext } from '@context/filters';
import CountrySelect from '@shared/CountrySelect';

import { CitiesFilters } from '../../../types';

export const CountryFilter = () => {
  const { filters, updateFilters } = useFiltersContext<CitiesFilters>();

  return (
    <CountrySelect
      value={filters.countries}
      onChange={(countries) => updateFilters({ countries })}
      label="Countries"
      placeholder="Countries"
    />
  );
};

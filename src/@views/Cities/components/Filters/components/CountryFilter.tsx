import { useFiltersContext } from '@context/filters';
import CountrySelect from '@shared/CountrySelect';
import { useTranslations } from '@translations';

import { CitiesFilters } from '../../../types';

export const CountryFilter = () => {
  const { filters, updateFilters } = useFiltersContext<CitiesFilters>();
  const translations = useTranslations().table.cells;

  return (
    <CountrySelect
      value={filters.countries}
      onChange={(countries) => updateFilters({ countries })}
      label={translations.country}
      placeholder={translations.country}
    />
  );
};

import useFilters from '@hooks/useFilters';

import { CountriesTable, CountriesWorldMap } from './components';
import { CountriesFilters } from './types';

const Countries = () => {
  const { filters, update, reset, isFiltered } = useFilters<CountriesFilters>(
    'countries',
    { regions: [], visa: [], english: 0 },
    ({ regions, visa, english }) =>
      regions.length > 0 || visa.length > 0 || english > 0,
  );

  return (
    <div className="pt-5 px-5">
      <CountriesWorldMap regions={filters.regions} />
      <CountriesTable
        filters={filters}
        updateFilters={update}
        resetFilters={reset}
        isFiltered={isFiltered}
      />
    </div>
  );
};

export default Countries;

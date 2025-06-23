import useFilters from '@hooks/useFilters';
import { City, Language } from '@root/types';
import apiService from '@services/api';
import { number } from '@utils/number.utils';
import { object } from '@utils/object.utils';
import { style } from '@utils/style.utils';
import { useMemo } from 'react';

import { CityTable, WorldMap } from './components';
import { CitiesFilters } from './types';

const Cities = () => {
  const { filters, update, reset, isFiltered } = useFilters<CitiesFilters>(
    'cities',
    { regions: [], minRating: 0, visa: [], countries: [], english: 0 },
    ({ regions, visa, countries, minRating, english }) =>
      regions.length > 0 ||
      visa.length > 0 ||
      countries.length > 0 ||
      minRating > 0 ||
      english > 0,
  );
  const { data: cities } = apiService.useCities();
  const { data: scores } = apiService.score.use();

  const filteredIds: Set<City> = useMemo(() => {
    if (!cities) return new Set();
    const regionsSet = new Set(filters.regions);
    const countriesSet = new Set(filters.countries);

    return new Set(
      object.keys(cities).filter((key) => {
        const city = cities[key];
        const cityRegions = new Set(city.country.regions);
        const isRegion =
          !regionsSet.size || cityRegions.intersection(regionsSet).size > 0;
        const isVisa =
          !filters.visa.length || filters.visa.includes(city.country.visaLevel);
        const isRating =
          !filters.minRating ||
          number.roundBy(scores[key]?.average / 2, 2) >= filters.minRating;
        const isCountry =
          !countriesSet.size || countriesSet.has(city.country.id);
        const isEnglish =
          city.language === Language.EN ||
          (city.country.englishSpeakersPercentage ?? 0) >=
            filters.english / 100;
        return isRegion && isVisa && isRating && isCountry && isEnglish;
      }),
    );
  }, [
    cities,
    filters.countries,
    filters.english,
    filters.minRating,
    filters.regions,
    filters.visa,
    scores,
  ]);

  return (
    <div className="px-5 pt-5">
      {style.isLargerThanPhone && (
        <WorldMap regions={filters.regions} filteredIds={filteredIds} />
      )}
      <CityTable
        filters={filters}
        updateFilters={update}
        resetFilters={reset}
        filteredIds={filteredIds}
        isFiltered={isFiltered}
      />
    </div>
  );
};

export default Cities;

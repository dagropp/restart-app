import { FiltersContextWrapper, IFiltersContext } from '@context/filters';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import EnglishFilter from '@shared/EnglishFilter';
import RegionFilter from '@shared/RegionFilter';
import VisaFilter from '@shared/VisaFilter';

import { CitiesFilters } from '../../types';
import { CountryFilter, RatingFilter } from './components';

export const Filters = (props: IFiltersContext<CitiesFilters>) => {
  const { resetFilters, isFiltered, filters, updateFilters } = props;
  const theme = useTheme();

  return (
    <FiltersContextWrapper {...props}>
      <div
        className="p-5 border-b flex items-center gap-4"
        style={{ borderColor: theme.palette.divider }}
      >
        <RegionFilter
          filter={filters.regions}
          onChange={(regions) => updateFilters({ regions })}
        />
        <CountryFilter />
        <VisaFilter
          filter={filters.visa}
          onChange={(visa) => updateFilters({ visa })}
        />
        <RatingFilter />
        <EnglishFilter
          filter={filters.english}
          onChange={(english) => updateFilters({ english })}
        />
        {isFiltered && (
          <IconButton onClick={resetFilters}>
            <ReplayRoundedIcon />
          </IconButton>
        )}
      </div>
    </FiltersContextWrapper>
  );
};

import { FiltersContextWrapper, IFiltersContext } from '@context/filters';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import EnglishFilter from '@shared/EnglishFilter';
import FiltersMenu from '@shared/FiltersMenu.tsx';
import RegionFilter from '@shared/RegionFilter';
import VisaFilter from '@shared/VisaFilter';
import { style } from '@utils/style.utils.ts';

import { CitiesFilters } from '../../types';
import { CountryFilter, RatingFilter } from './components';

export const Filters = (props: IFiltersContext<CitiesFilters>) => {
  const { resetFilters, isFiltered, filters, updateFilters } = props;
  const theme = useTheme();

  const list = (
    <>
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
    </>
  );

  return (
    <FiltersContextWrapper {...props}>
      <div
        className="p-5 border-b flex items-center gap-4"
        style={{ borderColor: theme.palette.divider }}
      >
        {style.isLargerThanTablet ? (
          <>
            {list}
            {isFiltered && (
              <IconButton onClick={resetFilters}>
                <ReplayRoundedIcon />
              </IconButton>
            )}
          </>
        ) : (
          <>
            <FiltersMenu isFiltered={isFiltered} reset={resetFilters}>
              <div className="flex flex-col gap-4 p-4">{list}</div>
            </FiltersMenu>
          </>
        )}
      </div>
    </FiltersContextWrapper>
  );
};

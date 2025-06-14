import Rating from '@common/Rating';
import Table, { TableColumn } from '@common/Table';
import Box from '@mui/material/Box';
import apiService, { City, Country } from '@services/api';
import { BookmarkCell } from '@shared/BookmarkCell';
import { CityDisplay } from '@shared/CityDisplay.tsx';
import CountryDisplay from '@shared/CountryDisplay.tsx';
import SectionCard from '@shared/SectionCard';
import { number } from '@utils/number.utils.ts';
import { object } from '@utils/object.utils';
import { FavoriteItem } from '@views/Group/components/types';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

const columns: TableColumn<FavoriteItem>[] = [
  {
    key: 'bookmark',
    cellRenderer: ({ row }) => <BookmarkCell row={row} isAlwaysVisible />,
  },
  {
    key: 'name',
    cellRenderer: ({ row }) =>
      row.isCity && row.country ? (
        <CityDisplay name={row.name} country={row.country} />
      ) : (
        <CountryDisplay country={row.id as Country} />
      ),
  },
  {
    key: 'score',
    cellRenderer: ({ row }) => {
      const { data: scores } = apiService.score.use();

      const score = scores?.[row.id as City];

      if (!row.isCity || !scores || !score) return null;

      return (
        <Rating
          value={score.average}
          base={10}
          readOnly
          tooltip={number.toFixed(score.average / 2)}
        />
      );
    },
  },
];

export const TopWidget = () => {
  const navigate = useNavigate();

  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();

  const favorites: FavoriteItem[] = useMemo(() => {
    if (!cities || !countries) return [];
    const favoriteCities: FavoriteItem[] = object
      .values(cities)
      .filter(({ isBookmark, isDestination }) => isBookmark || isDestination)
      .map(({ id, name, isBookmark, isDestination, country }) => ({
        id,
        name,
        isCity: true,
        isBookmark,
        isDestination,
        country: country.id,
      }));
    const favoriteCountries: FavoriteItem[] = object
      .values(countries)
      .filter(({ isBookmark, isDestination }) => isBookmark || isDestination)
      .map(({ id, name, isBookmark, isDestination }) => ({
        id,
        name,
        isCity: false,
        isBookmark,
        isDestination,
      }));
    return favoriteCities
      .concat(favoriteCountries)
      .toSorted((a, b) =>
        a.isDestination !== b.isDestination
          ? Number(b.isDestination) - Number(a.isDestination)
          : a.name.localeCompare(b.name),
      );
  }, [cities, countries]);

  const handleRowClick = (row: FavoriteItem) =>
    navigate(row.isCity ? `/city/${row.id}` : `/countries/${row.id}`);

  return (
    <SectionCard
      title="Places of Interest"
      contentClassName="max-h-[325px] flex flex-col"
    >
      <Box
        className="max-h-full overflow-y-auto"
        sx={{
          // bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Table
          headerHidden
          rows={favorites}
          columns={columns}
          rowKey="id"
          onRowClick={handleRowClick}
        />
      </Box>
    </SectionCard>
  );
};

import Rating from '@common/Rating';
import Table, { TableCellRenderer, type TableColumn } from '@common/Table';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import apiService, { City, type CityData, EuUnionStatus } from '@services/api';
import { BookmarkCell } from '@shared/BookmarkCell';
import CountryDisplay from '@shared/CountryDisplay';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import LanguageDisplay from '@shared/LanguageDisplay';
import VisaDisplay from '@shared/VisaDisplay';
import { useTranslations } from '@translations';
import { number } from '@utils/number.utils.ts';
import { object } from '@utils/object.utils';
import { tableSort } from '@utils/table-sort.utils';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { CitiesFilters } from '../../types';
import { Filters } from '../Filters';

interface Props {
  filters: CitiesFilters;
  updateFilters: (update: Partial<CitiesFilters>) => void;
  resetFilters: () => void;
  filteredIds: Set<City>;
  isFiltered: boolean;
}

const CountryCell = ({ row }: TableCellRenderer<CityData>) => (
  <CountryDisplay country={row.country.id} />
);

const CurrencyCell = ({ row }: TableCellRenderer<CityData>) => (
  <CurrencyDisplay currency={row.country.currency} flagHidden />
);

const VisaCell = ({ row }: TableCellRenderer<CityData>) => (
  <VisaDisplay level={row.country.visaLevel} type="short" />
);

const ScoreCell = ({ row }: TableCellRenderer<CityData>) => {
  const { data: scores } = apiService.score.use();
  const { average } = scores[row.id];
  return (
    <Rating
      value={average}
      base={10}
      readOnly
      tooltip={number.toFixed(average / 2)}
    />
  );
};

const LanguageCell = ({
  row: { language, country },
}: TableCellRenderer<CityData>) => (
  <LanguageDisplay
    languages={[language]}
    englishSpeakersPercentage={country.englishSpeakersPercentage}
  />
);

export const CityTable = ({
  filters,
  updateFilters,
  resetFilters,
  filteredIds,
  isFiltered,
}: Props) => {
  const { data, isLoading } = apiService.useCities();
  const { data: scores, isLoading: isScoresLoading } = apiService.score.use();
  const navigate = useNavigate();
  const translations = useTranslations();

  const handleRowClick = (row: CityData) => navigate('/city/' + row.id);

  const columns: TableColumn<CityData>[] = useMemo(
    () => [
      {
        key: 'bookmark',
        cellRenderer: BookmarkCell,
        className: '!pr-0',
        disableSort: true,
      },
      {
        key: 'name',
        label: translations.table.cells.city,
        valueFormatter: ({ name, state }) =>
          state ? `${name}, ${state}` : name,
      },
      {
        key: 'country',
        label: translations.table.cells.country,
        cellRenderer: CountryCell,
        sorter: (direction) => (a, b) =>
          a.country.name.localeCompare(b.country.name) * direction,
      },
      {
        key: 'score',
        label: translations.table.cells.score,
        cellRenderer: ScoreCell,
        sorter: (direction) => (a, b) =>
          (scores[b.id].average - scores[a.id].average) * direction,
      },
      {
        key: 'isEu',
        label: translations.table.cells.isEu,
        valueFormatter: (row) =>
          row.country.isEu === EuUnionStatus.Yes
            ? translations.common.yes
            : translations.common.no,
        sorter: tableSort.getIsEuSorter((row) => row.country.isEu),
      },
      {
        key: 'visaLevel',
        label: translations.table.cells.visa,
        cellRenderer: VisaCell,
        sorter: tableSort.getVisaLevelSorter((row) => row.country.visaLevel),
      },
      {
        key: 'language',
        label: translations.table.cells.language,
        cellRenderer: LanguageCell,
        sorter: tableSort.getLanguageSorter(
          (row) => row.language,
          translations,
        ),
      },
      {
        key: 'currency',
        label: translations.table.cells.currency,
        cellRenderer: CurrencyCell,
        sorter: tableSort.getCurrencySorter(
          (row) => row.country.currency,
          translations,
        ),
      },
    ],
    [scores, translations],
  );

  const rows = useMemo(
    () =>
      object
        .values(data ?? {})
        .filter(({ id }) => filteredIds.has(id))
        .toSorted((a: CityData, b: CityData) =>
          a.isDestination !== b.isDestination
            ? Number(b.isDestination) - Number(a.isDestination)
            : a.isBookmark !== b.isBookmark
              ? Number(b.isBookmark) - Number(a.isBookmark)
              : scores[b.id].average - scores[a.id].average,
        ),
    [data, filteredIds, scores],
  );

  return (
    <>
      <Box
        className="my-4 relative rounded-xl overflow-hidden border border-solid"
        sx={{
          bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
          borderColor: (theme) => theme.palette.divider,
        }}
      >
        <Filters
          filters={filters}
          updateFilters={updateFilters}
          resetFilters={resetFilters}
          isFiltered={isFiltered}
        />
        <Table
          rows={rows}
          columns={columns}
          rowKey="id"
          onRowClick={handleRowClick}
          loading={isLoading || isScoresLoading}
        />
      </Box>
    </>
  );
};

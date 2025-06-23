import Table, { type TableCellRenderer, TableColumn } from '@common/Table';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import { EuUnionStatus, Language } from '@root/types';
import apiService, { CountryResponse } from '@services/api';
import { BookmarkCell } from '@shared/BookmarkCell';
import CountryDisplay from '@shared/CountryDisplay';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import LanguageDisplay from '@shared/LanguageDisplay';
import VisaDisplay from '@shared/VisaDisplay';
import { object } from '@utils/object.utils';
import { tableSort } from '@utils/table-sort.utils';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { CountriesFilters } from '../types';
import { Filters } from './Filters';

interface Props {
  filters: CountriesFilters;
  updateFilters: (update: Partial<CountriesFilters>) => void;
  resetFilters: () => void;
  isFiltered: boolean;
}

const CountryCell = ({ row }: TableCellRenderer<CountryResponse>) => (
  <CountryDisplay country={row.id} />
);

const CurrencyCell = ({ row }: TableCellRenderer<CountryResponse>) => (
  <CurrencyDisplay currency={row.currency} flagHidden />
);

const VisaCell = ({ row }: TableCellRenderer<CountryResponse>) => (
  <VisaDisplay level={row.visaLevel} type="short" />
);

const LanguageCell = ({
  row: { language, englishSpeakersPercentage },
}: TableCellRenderer<CountryResponse>) => (
  <LanguageDisplay
    languages={language}
    englishSpeakersPercentage={englishSpeakersPercentage}
  />
);

const columns: TableColumn<CountryResponse>[] = [
  {
    key: 'bookmark',
    cellRenderer: BookmarkCell,
    className: '!pr-0',
    disableSort: true,
  },
  {
    key: 'name',
    label: 'Country',
    cellRenderer: CountryCell,
  },
  {
    key: 'isEu',
    label: 'Is EU',
    valueFormatter: (row) => (row.isEu === EuUnionStatus.Yes ? 'Yes' : 'No'),
    sorter: tableSort.getIsEuSorter((row) => row.isEu),
  },
  {
    key: 'visaLevel',
    label: 'Visa Requirements',
    cellRenderer: VisaCell,
    sorter: tableSort.getVisaLevelSorter((row) => row.visaLevel),
  },
  {
    key: 'language',
    label: 'Language',
    cellRenderer: LanguageCell,
    sorter: tableSort.getLanguageSorter((row) => row.language),
  },
  {
    key: 'currency',
    label: 'Currency',
    cellRenderer: CurrencyCell,
    sorter: tableSort.getCurrencySorter((row) => row.currency),
  },
];

export const CountriesTable = ({
  filters,
  updateFilters,
  resetFilters,
  isFiltered,
}: Props) => {
  const { data, isLoading } = apiService.countries.useList();
  const navigate = useNavigate();

  const handleRowClick = (row: CountryResponse) => navigate(row.id);

  const filtered = useMemo(() => {
    if (!data) return [];
    const regionsSet = new Set(filters.regions);

    return object
      .values(data)
      .filter((country) => {
        const cityRegions = new Set(country.regions);
        const isRegion =
          !regionsSet.size || cityRegions.intersection(regionsSet).size > 0;
        const isVisa =
          !filters.visa.length || filters.visa.includes(country.visaLevel);
        const isEnglish =
          country.language.includes(Language.EN) ||
          (country.englishSpeakersPercentage ?? 0) >= filters.english / 100;
        return isRegion && isVisa && isEnglish;
      })
      .toSorted((a, b) =>
        a.isDestination !== b.isDestination
          ? Number(b.isDestination) - Number(a.isDestination)
          : a.isBookmark !== b.isBookmark
            ? Number(b.isBookmark) - Number(a.isBookmark)
            : a.name.localeCompare(b.name),
      );
  }, [data, filters.english, filters.regions, filters.visa]);

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
          rows={filtered}
          columns={columns}
          rowKey="id"
          onRowClick={handleRowClick}
          loading={isLoading}
        />
      </Box>
    </>
  );
};

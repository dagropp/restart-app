import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsCurrencies,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { formatCurrency } from '@utils/format.utils';
import { tableSort } from '@utils/table-sort.utils';
import { useMemo } from 'react';

export const CurrenciesData = () => {
  const translations = useTranslations();

  const { data = [] } = useQuery({
    queryKey: ['getCurrenciesScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.Currencies),
  });

  const columns: TableColumn<ScrapingRecordsCurrencies>[] = useMemo(
    () => [
      {
        key: 'lastUpdate',
        label: 'Last Updated',
        valueFormatter: (row) => dateService.formatDateTime(row.lastUpdate),
        className: 'w-[180px]',
      },
      {
        key: 'currency',
        label: 'Code',
        className: 'w-[100px]',
      },
      {
        key: 'name',
        label: 'Name',
        cellRenderer: ({ row }) => (
          <CurrencyDisplay
            currency={row.currency}
            className="w-max"
            showConversion
          />
        ),
        className: 'w-[250px]',
        sorter: tableSort.getCurrencySorter(
          (row) => row.currency,
          translations,
        ),
      },
      {
        key: 'value',
        label: 'Value of $1',
        valueFormatter: (row) => formatCurrency(row.value, row.currency),
      },
    ],
    [translations],
  );

  return (
    <Table
      rows={data}
      columns={columns}
      rowKey="currency"
      defaultSort={{ key: 'currency', direction: 'asc' }}
      stickyHeader
    />
  );
};

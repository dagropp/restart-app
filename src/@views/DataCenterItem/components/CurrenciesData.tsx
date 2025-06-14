import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsCurrencies,
  ScrapingType,
} from '@services/api';
import currencyService from '@services/currency';
import dateService from '@services/date.service';
import CurrencyDisplay from '@shared/CurrencyDisplay.tsx';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@utils/format.utils.ts';

const columns: TableColumn<ScrapingRecordsCurrencies>[] = [
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
    sorter: (direction) => (a, b) => {
      const aName = currencyService.map[a.currency].name;
      const bName = currencyService.map[b.currency].name;
      return aName.localeCompare(bName) * direction;
    },
  },
  {
    key: 'value',
    label: 'Value of $1',
    valueFormatter: (row) => formatCurrency(row.value, row.currency),
  },
];

export const CurrenciesData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getCurrenciesScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.Currencies),
  });

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

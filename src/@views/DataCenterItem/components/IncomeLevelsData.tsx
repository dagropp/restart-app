import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsIncomeLevels,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import { CityDisplay } from '@shared/CityDisplay';
import { useQuery } from '@tanstack/react-query';
import { format } from '@utils/format.utils.ts';

import { CurrencyValueCell, IncomeTypeJobCell } from './cell-renderers';

const columns: TableColumn<ScrapingRecordsIncomeLevels>[] = [
  {
    key: 'lastUpdate',
    label: 'Last Updated',
    valueFormatter: (row) =>
      row.lastUpdate ? dateService.formatDateTime(row.lastUpdate) : 'N/A',
    className: 'w-[150px]',
  },
  {
    key: 'city',
    label: 'City',
    cellRenderer: ({ row }) => <CityDisplay id={row.city} />,
  },
  {
    key: 'type',
    label: 'Job',
    cellRenderer: IncomeTypeJobCell,
  },
  {
    key: 'low',
    label: 'Annual Income (Low)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.low} />
    ),
    disableSort: true,
  },
  {
    key: 'median',
    label: 'Annual Income (Median)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.median} />
    ),
    disableSort: true,
  },
  {
    key: 'high',
    label: 'Annual Income (High)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.high} />
    ),
    disableSort: true,
  },
  {
    key: 'extreme',
    label: 'Annual Income (Extreme)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.extreme} />
    ),
    disableSort: true,
  },
  {
    key: 'jobs',
    label: 'Active Jobs',
    valueFormatter: (row) =>
      row.jobs
        ? JSON.parse(row.jobs)
            .map((item: number) => format.shortNumber(item))
            .join(', ')
        : 'N/A',
    disableSort: true,
  },
  {
    key: 'error',
    label: 'Error',
    valueFormatter: (row) => row.error?.message ?? '',
  },
];

export const IncomeLevelsData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getIncomeLevelsScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.IncomeLevels),
  });

  return (
    <Table
      rows={data}
      columns={columns}
      rowKey="id"
      defaultSort={{ key: 'city', direction: 'asc' }}
    />
  );
};

import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsFlights,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import { CityDisplay } from '@shared/CityDisplay';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@utils/format.utils';

const columns: TableColumn<ScrapingRecordsFlights>[] = [
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
    className: 'w-[150px]',
  },
  {
    key: 'currency',
    label: 'Currency',
    cellRenderer: ({ row }) =>
      row.currency && (
        <CurrencyDisplay currency={row.currency} className="w-max" flagHidden />
      ),
    className: 'w-[180px]',
  },
  {
    key: 'direct',
    label: 'Direct Flight',
    valueFormatter: (row) =>
      row.directPrice && row.currency && row.directDuration
        ? `${formatCurrency(row.directPrice, row.currency)} / ${dateService.getTimeByMinutes(row.directDuration)}`
        : 'N/A',
    disableSort: true,
    className: 'w-[180px]',
  },
  {
    key: 'nonDirect',
    label: 'Non-Direct Flight',
    valueFormatter: (row) =>
      row.stopsPrice &&
      row.currency &&
      row.stopsDuration &&
      row.stopsPrice !== row.directPrice
        ? `${formatCurrency(row.stopsPrice, row.currency)} / ${dateService.getTimeByMinutes(row.stopsDuration)}`
        : 'N/A',
    disableSort: true,
    className: 'w-[180px]',
  },
  {
    key: 'error',
    label: 'Error',
    valueFormatter: (row) => row.error?.message ?? '',
  },
];

export const FlightsData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getFlightsScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.Flights),
  });

  return (
    <Table
      rows={data}
      columns={columns}
      rowKey="city"
      defaultSort={{ key: 'city', direction: 'asc' }}
    />
  );
};

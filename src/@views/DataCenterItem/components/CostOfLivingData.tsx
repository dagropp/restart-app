import Table, { TableColumn } from '@common/Table';
import apiService, {
  City,
  Country,
  ScrapingRecordsCostOfLiving,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import { CityDisplay } from '@shared/CityDisplay';
import CountryDisplay from '@shared/CountryDisplay.tsx';
import { useQuery } from '@tanstack/react-query';
import { CurrencyValueCell } from '@views/DataCenterItem/components/cell-renderers';

const columns: TableColumn<ScrapingRecordsCostOfLiving>[] = [
  {
    key: 'lastUpdate',
    label: 'Last Updated',
    valueFormatter: (row) =>
      row.lastUpdate ? dateService.formatDateTime(row.lastUpdate) : 'N/A',
    className: 'w-[140px]',
  },
  {
    key: 'city',
    label: 'City',
    cellRenderer: ({ row }) =>
      row.placeType === 'city' ? (
        <CityDisplay id={row.city as City} />
      ) : (
        <CountryDisplay country={row.city as Country} />
      ),
  },
  {
    key: 'generalCost',
    label: 'General Cost (Family of Four / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.generalCost} />
    ),
    disableSort: true,
  },
  {
    key: 'generalSingleCost',
    label: 'General Cost (Single Person / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.generalSingleCost} />
    ),
    disableSort: true,
  },
  {
    key: 'rentOuter',
    label: 'Rent Outside of Centre (3 Bedrooms / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.rentOuter} />
    ),
    disableSort: true,
  },
  {
    key: 'rentCentral',
    label: 'Rent in City Centre (3 Bedrooms / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.rentCentral} />
    ),
    disableSort: true,
  },
  {
    key: 'rentSingleOuter',
    label: 'Rent Outside of Centre (1 Bedroom / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.rentSingleOuter} />
    ),
    disableSort: true,
  },
  {
    key: 'rentSingleCentral',
    label: 'Rent in City Centre (1 Bedroom / Month)',
    cellRenderer: ({ row }) => (
      <CurrencyValueCell id={row.city} value={row.rentSingleCentral} />
    ),
  },
];

export const CostOfLivingData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getCostOfLivingScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.CostOfLiving),
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

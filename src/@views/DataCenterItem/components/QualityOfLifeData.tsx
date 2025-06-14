import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsQualityOfLife,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import { CityDisplay } from '@shared/CityDisplay';
import { useQuery } from '@tanstack/react-query';

const columns: TableColumn<ScrapingRecordsQualityOfLife>[] = [
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
    className: 'w-[200px]',
  },
  {
    key: 'rank',
    label: 'Rank',
    valueFormatter: (row) => `${row.rank}/${row.minRank}`,
  },
];

export const QualityOfLifeData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getQualityOfLifeScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.QualityOfLife),
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

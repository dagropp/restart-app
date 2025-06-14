import Table, { TableColumn } from '@common/Table';
import apiService, {
  ScrapingRecordsCommunity,
  ScrapingType,
} from '@services/api';
import dateService from '@services/date.service';
import { CityDisplay } from '@shared/CityDisplay';
import { useQuery } from '@tanstack/react-query';
import { format } from '@utils/format.utils';

import { CommunityLinkCell } from './cell-renderers';

const columns: TableColumn<ScrapingRecordsCommunity>[] = [
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
    key: 'members',
    label: 'Members',
    valueFormatter: (row) =>
      row.members ? format.shortNumber(row.members) : 'N/A',
    className: 'w-[150px]',
  },
  {
    key: 'link',
    label: 'Link',
    cellRenderer: CommunityLinkCell,
    disableSort: true,
    className: 'w-[150px]',
  },
  {
    key: 'error',
    label: 'Error',
    valueFormatter: (row) => row.error?.message ?? '',
  },
];

export const CommunityData = () => {
  const { data = [] } = useQuery({
    queryKey: ['getCommunityScrapingData'],
    queryFn: () => apiService.scraping.getByType(ScrapingType.Community),
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

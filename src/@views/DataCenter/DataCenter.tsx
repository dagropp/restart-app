import Table, { TableColumn } from '@common/Table';
import { useUserContext } from '@context/user';
import apiService, { ScrapingData } from '@services/api';
import dateService from '@services/date.service';
import titleService from '@services/title';
import { format } from '@utils/format.utils.ts';
import { useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

import { ActionsCell, ErrorsCell, FreshnessCell } from './cell-renderers';
import { getDataFreshness, scrapingTypeMap } from './utils';

const PermittedDataCenter = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Settings', 'Data Center');
  }, []);

  const navigate = useNavigate();

  const { data = [] } = apiService.scraping.useData();

  const columns: TableColumn<ScrapingData>[] = [
    {
      key: 'type',
      label: 'Type',
      valueFormatter: (row) => scrapingTypeMap[row.type],
      className: 'w-[150px]',
    },
    {
      key: 'lastUpdate',
      label: 'Last Updated',
      valueFormatter: (row) => {
        return row.records > 0
          ? dateService.formatDateTimeRange(
              row.lastUpdate[0],
              row.lastUpdate[1],
            )
          : 'N/A';
      },
      className: 'w-[200px]',
    },
    {
      key: 'freshness',
      label: 'Freshness',
      cellRenderer: FreshnessCell,
      className: 'w-[100px]',
      sorter: (direction) => (a, b) => {
        const aFreshness = getDataFreshness(a.records, a.lastUpdate);
        const bFreshness = getDataFreshness(b.records, b.lastUpdate);
        return (aFreshness - bFreshness) * direction;
      },
    },
    {
      key: 'records',
      label: 'Records',
      className: 'w-[100px]',
      valueFormatter: (row) => format.shortNumber(row.records),
    },
    {
      key: 'errors',
      label: 'Errors',
      cellRenderer: ErrorsCell,
      sorter: (direction) => (a, b) =>
        (a.errors.length - b.errors.length) * direction,
      className: 'w-[100px]',
    },
    {
      key: 'actions',
      cellRenderer: ActionsCell,
    },
  ];

  return (
    <Table
      rows={data}
      columns={columns}
      rowKey="type"
      onRowClick={(row) => navigate(row.type)}
    />
  );
};

const DataCenter = () => {
  const { isAdmin } = useUserContext();

  return isAdmin ? <PermittedDataCenter /> : <Navigate to="/" replace />;
};

export default DataCenter;

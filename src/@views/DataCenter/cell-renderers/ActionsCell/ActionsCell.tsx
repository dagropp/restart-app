import { TableCellRenderer } from '@common/Table';
import apiService, { ScrapingData } from '@services/api';
import {
  DeleteData,
  UpdateData,
} from '@views/DataCenter/cell-renderers/ActionsCell/components';
import { useState } from 'react';

export const ActionsCell = ({ row }: TableCellRenderer<ScrapingData>) => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: statuses, refetch: refetchStatuses } =
    apiService.scraping.useAllStatuses(isFetching);

  const { refetch: refetchData } = apiService.scraping.useData();

  const status = statuses?.[row.type];

  return (
    <div
      className="flex items-center gap-2"
      onClick={(event) => event.stopPropagation()}
    >
      <DeleteData
        type={row.type}
        isFetching={isFetching}
        isPending={status?.isPending}
        disabled={!row.records}
      />
      <UpdateData
        type={row.type}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        refetchData={refetchData}
        refetchStatuses={refetchStatuses}
        status={status}
      />
    </div>
  );
};

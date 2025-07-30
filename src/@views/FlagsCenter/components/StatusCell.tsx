import Switch from '@common/Switch';
import { TableCellRenderer } from '@common/Table';
import apiService, { type FlagItemResponse } from '@services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LIST_QUERY_KEY } from '../constants';

export const StatusCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  const { id, status, ...data } = row;
  const queryClient = useQueryClient();

  const editStatusApi = useMutation({
    mutationFn: (update: boolean) =>
      apiService.flags.update(id, { ...data, status: update }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [LIST_QUERY_KEY] }),
  });

  return (
    <Switch
      checked={status}
      onChange={editStatusApi.mutate}
      disabled={editStatusApi.isPending}
    />
  );
};

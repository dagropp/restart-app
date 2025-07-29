import Table, { type TableColumn } from '@common/Table';
import { useUserContext } from '@context/user';
import apiService, { type FlagItemResponse } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router';

import {
  CreateNewFlag,
  DeleteCell,
  GroupsCell,
  StatusCell,
  UsersCell,
} from './components';
import { LIST_QUERY_KEY } from './constants';

const columns: TableColumn<FlagItemResponse>[] = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status', cellRenderer: StatusCell },
  { key: 'users', label: 'Users', cellRenderer: UsersCell },
  { key: 'groups', label: 'Groups', cellRenderer: GroupsCell },
  { key: 'actions', cellRenderer: DeleteCell },
];

const PermittedFlagsCenter = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: [LIST_QUERY_KEY],
    queryFn: () => apiService.flags.getList(),
  });

  return (
    <div>
      <CreateNewFlag />
      <Table rows={data} loading={isLoading} columns={columns} rowKey="id" />
    </div>
  );
};

const FlagsCenter = () => {
  const { isAdmin } = useUserContext();

  return isAdmin ? <PermittedFlagsCenter /> : <Navigate to="/" replace />;
};

export default FlagsCenter;

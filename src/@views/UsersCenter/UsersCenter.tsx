import CopyToClipboard from '@common/CopyToClipboard';
import Link from '@common/Link';
import Table, { type TableColumn } from '@common/Table';
import { useUserContext } from '@context/user';
import apiService, { type CompactUserResponse } from '@services/api';
import UserAvatar from '@shared/UserAvatar.tsx';
import { object } from '@utils/object.utils.ts';
import { Navigate } from 'react-router';

const columns: TableColumn<CompactUserResponse>[] = [
  {
    key: 'name',
    label: 'Name',
    cellRenderer: ({ row }) => (
      <span className="flex items-center">
        <UserAvatar
          firstName={row.firstName}
          lastName={row.lastName}
          avatar={row.avatar}
          className="scale-75 origin-left"
        />
        <span>
          {row.firstName} {row.lastName}
        </span>
      </span>
    ),
  },
  {
    key: 'email',
    label: 'Email',
    cellRenderer: ({ row }) => (
      <CopyToClipboard value={row.email}>{row.email}</CopyToClipboard>
    ),
  },
];

const PermittedUsersCenter = () => {
  const { data, isLoading } = apiService.useUsers();

  return (
    <Table
      rows={object.values(data ?? {})}
      loading={isLoading}
      columns={columns}
      rowKey="id"
    />
  );
};

const UsersCenter = () => {
  const { isAdmin } = useUserContext();

  return isAdmin ? <PermittedUsersCenter /> : <Navigate to="/" replace />;
};

export default UsersCenter;

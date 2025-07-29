import { TableCellRenderer } from '@common/Table';
import { type FlagItemResponse } from '@services/api';

export const UsersCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  return <div>Bla {row.users}</div>;
};

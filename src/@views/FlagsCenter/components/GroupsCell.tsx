import { TableCellRenderer } from '@common/Table';
import { type FlagItemResponse } from '@services/api';

export const GroupsCell = ({ row }: TableCellRenderer<FlagItemResponse>) => {
  return <div>Bli {row.groups}</div>;
};

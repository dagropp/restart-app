import TableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import { HeaderTableCell } from '../HeaderTableCell';
import { type TableHeaderProps } from './types';

export const TableHeader = <T extends object>({
  columns,
  sort,
  setSort,
  disableSort,
}: TableHeaderProps<T>) => {
  const cells = columns.map((cell) => (
    <HeaderTableCell
      key={String(cell.key)}
      column={cell}
      sort={sort}
      setSort={setSort}
      disableSort={disableSort}
    />
  ));

  return (
    <TableHead>
      <MuiTableRow>{cells}</MuiTableRow>
    </TableHead>
  );
};

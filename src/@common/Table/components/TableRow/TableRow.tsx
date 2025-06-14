import MuiTableRow from '@mui/material/TableRow';

import { TableCell } from '../TableCell';
import { TableRowProps } from './types';

export const TableRow = <T extends object>({
  onRowClick,
  row,
  columns,
}: TableRowProps<T>) => {
  const handleClick = onRowClick && (() => onRowClick?.(row));

  const cells = columns.map((column) => (
    <TableCell key={String(column.key)} column={column} row={row} />
  ));

  return (
    <MuiTableRow
      hover
      onClick={handleClick}
      tabIndex={-1}
      sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
      className="group"
    >
      {cells}
    </MuiTableRow>
  );
};

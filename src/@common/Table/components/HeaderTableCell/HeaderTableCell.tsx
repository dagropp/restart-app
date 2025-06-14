import MuiTableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { type HeaderTableCellProps } from './types';

export const HeaderTableCell = <T extends object>({
  column,
  sort,
  setSort,
  disableSort,
}: HeaderTableCellProps<T>) => {
  const isSorted = sort?.key === column.key;

  const handleSort = () =>
    setSort({
      key: column.key as keyof T,
      direction: !isSorted ? 'asc' : sort.direction === 'asc' ? 'desc' : 'asc',
    });

  return (
    <MuiTableCell
      padding="normal"
      sortDirection={isSorted ? sort.direction : false}
    >
      {!disableSort && !column.disableSort ? (
        <TableSortLabel
          active={isSorted}
          direction={isSorted ? sort.direction : 'asc'}
          onClick={handleSort}
        >
          {column.label}
        </TableSortLabel>
      ) : (
        column.label
      )}
    </MuiTableCell>
  );
};

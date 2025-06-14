import MuiTableCell from '@mui/material/TableCell';

import { type TableCellProps } from './types';

export const TableCell = <T extends object>({
  row,
  column,
}: TableCellProps<T>) => {
  const setLabel = () => {
    const data = row[column.key as keyof T];
    if (column.cellRenderer) {
      const Component = column.cellRenderer;
      return <Component row={row} />;
    }
    if (column.valueFormatter) return column.valueFormatter(row);
    if (data === null || data === undefined || data === '') return '--';
    if (Array.isArray(data)) return data.join(', ');

    switch (typeof data) {
      case 'string':
        return data;
      case 'number':
        return data.toLocaleString();
      case 'boolean':
        return data ? 'Yes' : 'No';
      case 'object':
        return JSON.stringify(data);
      default:
        return String(data);
    }
  };
  return (
    <MuiTableCell width="max-content" className={column.className}>
      {setLabel()}
    </MuiTableCell>
  );
};

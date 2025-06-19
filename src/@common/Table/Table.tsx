import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useTranslations } from '@translations';
import { useMemo, useState } from 'react';

import Typography from '../Typography';
import { TableHeader, TableRow, TableSkeleton } from './components';
import { type TableProps, type TableSort } from './types';
import { sortTable } from './utils';

const Table = <T extends object>({
  rows,
  columns,
  onRowClick,
  rowKey,
  defaultSort,
  headerHidden,
  loading,
}: TableProps<T>) => {
  const [sort, setSort] = useState<TableSort<T> | undefined>(defaultSort);
  const translations = useTranslations().table.empty;

  const sorted = useMemo(
    () =>
      sort?.direction && sort?.key
        ? sortTable(rows, columns, sort.key, sort.direction)
        : rows,
    [rows, columns, sort?.direction, sort?.key],
  );

  const rowsList = sorted.map((row) => (
    <TableRow
      key={String(row[rowKey])}
      columns={columns}
      row={row}
      onRowClick={onRowClick}
    />
  ));

  return (
    <TableContainer>
      <MuiTable size="medium" stickyHeader>
        {!headerHidden && (
          <TableHeader
            columns={columns}
            sort={sort}
            setSort={setSort}
            disableSort={!rows.length || loading}
          />
        )}
        <TableBody>
          {loading ? <TableSkeleton columnsCount={columns.length} /> : rowsList}
        </TableBody>
      </MuiTable>
      {!rows.length && (
        <div className="h-[300px] flex items-center justify-center flex-col gap-2">
          <SentimentDissatisfiedRoundedIcon fontSize="large" />
          <Typography variant="h6">{translations.title}</Typography>
          <Typography color="textSecondary">{translations.subtitle}</Typography>
        </div>
      )}
    </TableContainer>
  );
};

export default Table;

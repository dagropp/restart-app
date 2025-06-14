import { type TableProps as MuiTableProps } from '@mui/material/Table';
import { type SortDirection as MuiSortDirection } from '@mui/material/TableCell';
import { type FunctionComponent, type ReactNode } from 'react';

export interface TableCellRenderer<T extends object> {
  row: T;
}

export interface TableColumn<T extends object> {
  key: keyof T | string;
  label?: ReactNode;
  cellRenderer?: FunctionComponent<TableCellRenderer<T>>;
  valueFormatter?: (row: T) => string;
  sorter?: (direction: 1 | -1) => (a: T, b: T) => number;
  className?: string;
  disableSort?: boolean;
}

export type SortDirection = Exclude<MuiSortDirection, false>;

export interface TableSort<T extends object> {
  key: keyof T;
  direction: SortDirection;
}

export type RowClickCallback<T extends object> = (row: T) => void;

export interface TableProps<T extends object> extends MuiTableProps {
  rows: T[];
  columns: TableColumn<T>[];
  onRowClick?: RowClickCallback<T>;
  rowKey: keyof T;
  defaultSort?: TableSort<T>;
  headerHidden?: boolean;
  loading?: boolean;
}

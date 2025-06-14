import { type TableColumn } from '../../types';

export interface TableCellProps<T extends object> {
  row: T;
  column: TableColumn<T>;
}

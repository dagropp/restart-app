import { type RowClickCallback, type TableColumn } from '../../types';

export interface TableRowProps<T extends object> {
  columns: TableColumn<T>[];
  row: T;
  onRowClick?: RowClickCallback<T>;
}

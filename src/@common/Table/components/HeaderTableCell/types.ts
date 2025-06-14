import { type Dispatch, type SetStateAction } from 'react';

import { type TableColumn, type TableSort } from '../../types';

export interface HeaderTableCellProps<T extends object> {
  column: TableColumn<T>;
  sort?: TableSort<T>;
  setSort: Dispatch<SetStateAction<TableSort<T> | undefined>>;
  disableSort?: boolean;
}

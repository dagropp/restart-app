import { type Dispatch, type SetStateAction } from 'react';

import { type TableColumn, type TableSort } from '../../types';

export interface TableHeaderProps<T extends object> {
  columns: TableColumn<T>[];
  sort?: TableSort<T>;
  setSort: Dispatch<SetStateAction<TableSort<T> | undefined>>;
  disableSort?: boolean;
}

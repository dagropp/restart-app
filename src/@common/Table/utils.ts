import { type SortDirection, TableColumn } from './types';

const getSorter = <T extends object>(
  rows: T[],
  columns: TableColumn<T>[],
  sortKey: keyof T,
  sortDirection: SortDirection,
): ((a: T, b: T) => number) => {
  const column = columns.find(({ key }) => key === sortKey);
  const direction = sortDirection === 'asc' ? 1 : -1;

  if (column?.sorter) return column.sorter(direction);

  const sample = rows[0]?.[sortKey];

  switch (typeof sample) {
    case 'number':
    case 'boolean':
      return (a: T, b: T) =>
        (Number(a[sortKey]) - Number(b[sortKey])) * direction;
    default:
      return (a: T, b: T) =>
        String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, {
          sensitivity: 'base',
        }) * direction;
  }
};

export const sortTable = <T extends object>(
  rows: T[],
  columns: TableColumn<T>[],
  sortKey: keyof T,
  sortDirection: SortDirection,
): T[] => {
  const sorter = getSorter(rows, columns, sortKey, sortDirection);
  return rows.toSorted(sorter);
};

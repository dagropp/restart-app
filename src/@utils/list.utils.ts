import { object } from '@utils/object.utils';

interface BaseList {
  id: string;
}

type ListNavigationData<T extends BaseList> = [T | undefined, T | undefined];

const getListNavigation = <T extends BaseList>(
  item: T | undefined,
  list: Record<string, T> | undefined,
  sortFn: (a: T, b: T) => number,
): ListNavigationData<T> => {
  if (!item || !list) return [undefined, undefined];
  const sorted = object.values(list).toSorted(sortFn);
  const currentIndex = sorted.findIndex(({ id }) => item?.id === id);
  const prev = sorted.at(currentIndex - 1);
  const next = sorted.at((currentIndex + 1) % sorted.length);
  return [prev, next];
};

export const list = { getListNavigation };

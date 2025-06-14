import { number } from '@utils/number.utils';
import { object } from '@utils/object.utils';

import { CostRow, CostStateItem } from '../context';

export const getSimulationStateSum = <T extends Record<string, CostStateItem>>(
  rows: Record<keyof T | string, CostRow>,
  state: T,
) => {
  const values = object
    .entries(state)
    .filter(([, { hidden }]) => !hidden)
    .map(([key, { value, instances = 1 }]) =>
      rows[key]?.mapper
        ? rows[key].mapper(value * instances)
        : value * instances,
    );
  return number.sum(...values);
};

import { Currency } from '@services/api';
import { object } from '@utils/object.utils.ts';

import { map, order } from './currency.const.tsx';

class CurrencyService {
  map = map;

  list = object.values(Currency).toSorted((a, b) => {
    const aIndex = order.indexOf(a);
    const bIndex = order.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });
}

const currencyService = new CurrencyService();

export default currencyService;

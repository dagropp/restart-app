import { type City, type IncomeType } from '@root/types';

import { http } from '../../http.service';
import { IncomeResponse } from '../types';
import { getUrl } from '../utils';

const all = (): Promise<IncomeResponse[]> => http.get(getUrl('income'));

const get = (
  id: City,
  incomeType: IncomeType,
  partnerId?: string,
): Promise<IncomeResponse> =>
  http.get(getUrl('income', id), { incomeType, partnerId });

export const income = { all, get };

import { http } from '../../http.service';
import { City, IncomeResponse, IncomeType } from '../types';
import { getUrl } from '../utils';

const all = (): Promise<IncomeResponse[]> => http.get(getUrl('income'));

const get = (
  id: City,
  incomeType: IncomeType,
  partnerId?: string,
): Promise<IncomeResponse> =>
  http.get(getUrl('income', id), { incomeType, partnerId });

export const income = { all, get };

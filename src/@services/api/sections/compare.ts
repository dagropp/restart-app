import { City } from '@root/types';
import { type Language } from '@translations';

import { http } from '../../http.service';
import { CompareData } from '../types';
import { getUrl } from '../utils';

const get = (
  id: City,
  other: City,
  language: Language,
): Promise<CompareData[]> =>
  http.get(getUrl('compare', id, other), { language });

export const compare = { get };

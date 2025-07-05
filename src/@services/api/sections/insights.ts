import { City } from '@root/types';
import { Language } from '@translations';

import { http } from '../../http.service';
import { InsightsResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City, language: Language): Promise<InsightsResponse> =>
  http.get(getUrl('insights', id), { language });

export const insights = { get };

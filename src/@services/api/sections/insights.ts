import { City } from '@root/types';

import { http } from '../../http.service';
import { InsightsResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City): Promise<InsightsResponse> =>
  http.get(getUrl('insights', id));

export const insights = { get };

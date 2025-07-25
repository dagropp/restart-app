import { City } from '@root/types';

import { http } from '../../http.service';
import { QualityIndexResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City): Promise<QualityIndexResponse> =>
  http.get(getUrl('quality', id));

export const quality = { get };

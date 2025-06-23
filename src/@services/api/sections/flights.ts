import { City } from '@root/types';

import { http } from '../../http.service';
import { FlightsResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City): Promise<FlightsResponse> =>
  http.get(getUrl('flights', id));

export const flights = { get };

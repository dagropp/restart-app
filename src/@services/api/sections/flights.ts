import { http } from '../../http.service';
import { City, FlightsResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City): Promise<FlightsResponse> =>
  http.get(getUrl('flights', id));

export const flights = { get };

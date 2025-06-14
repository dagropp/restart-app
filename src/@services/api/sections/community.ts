import { http } from '../../http.service';
import { City, CommunityResponse } from '../types';
import { getUrl } from '../utils';

const get = (id: City): Promise<CommunityResponse> =>
  http.get(getUrl('community', id));

export const community = { get };

import { http } from '../../http.service';
import { City, CompareData } from '../types';
import { getUrl } from '../utils';

const get = (id: City, other: City): Promise<CompareData[]> =>
  http.get(getUrl('compare', id, other));

export const compare = { get };

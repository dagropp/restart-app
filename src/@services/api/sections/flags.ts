import {
  EditFlagPayload,
  FlagItemResponse,
  FlagsResponse,
  StatusResponse,
} from '@services/api';
import { useQuery } from '@tanstack/react-query';

import { http } from '../../http.service';
import { getUrl } from '../utils';

const ROOT = 'flags';

const get = (): Promise<FlagsResponse> => http.get(getUrl(ROOT));

const getList = (): Promise<FlagItemResponse[]> =>
  http.get(getUrl(ROOT, 'list'));

const create = (payload: EditFlagPayload): Promise<StatusResponse> =>
  http.put(getUrl(ROOT), payload);

const update = (
  id: number,
  payload: EditFlagPayload,
): Promise<StatusResponse> => http.put(getUrl(ROOT, id), payload);

const deleteFlag = (id: number): Promise<StatusResponse> =>
  http.delete(getUrl(ROOT, id));

const use = () => {
  const { data = {} as FlagsResponse } = useQuery({
    queryKey: ['getFlags'],
    queryFn: get,
    staleTime: Infinity,
  });

  return data;
};

export const flags = { getList, create, update, delete: deleteFlag, use };

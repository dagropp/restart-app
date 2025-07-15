import { http } from '../../http.service';
import {
  ChecklistResponse,
  PutChecklistPayload,
  StatusResponse,
} from '../types';
import { getUrl } from '../utils';

const ROOT = 'checklist';

const get = (): Promise<ChecklistResponse> => http.get(getUrl(ROOT));

const deleteItem = (id: string): Promise<StatusResponse> =>
  http.delete(getUrl(ROOT, 'item', id));

const deleteChecked = (): Promise<StatusResponse> =>
  http.delete(getUrl(ROOT, 'checked'));

const deleteAll = (): Promise<StatusResponse> => http.delete(getUrl(ROOT));

const put = (
  id: string,
  payload: PutChecklistPayload,
): Promise<StatusResponse> => http.put(getUrl(ROOT, id), payload);

export const checklist = { get, deleteItem, deleteChecked, deleteAll, put };

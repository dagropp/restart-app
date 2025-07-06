import { http } from '../../http.service';
import {
  SavedSimulation,
  SaveSimulationPayload,
  StatusResponse,
} from '../types';
import { getUrl } from '../utils';

const ROOT = 'simulation';

const get = async (): Promise<SavedSimulation[]> => http.get(getUrl(ROOT));

const deleteSimulation = async (id: number): Promise<StatusResponse> =>
  http.delete(getUrl(ROOT, id));

const create = async (
  payload: SaveSimulationPayload,
): Promise<StatusResponse> => http.put(getUrl(ROOT), payload);

const update = async (
  id: number,
  payload: SaveSimulationPayload,
): Promise<StatusResponse> => http.put(getUrl(ROOT, id), payload);

export const simulation = { get, create, update, delete: deleteSimulation };

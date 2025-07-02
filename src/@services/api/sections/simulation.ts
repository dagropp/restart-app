import { http } from '../../http.service';
import {
  SavedSimulation,
  SaveSimulationPayload,
  UpdateSimulationPayload,
} from '../types';
import { getUrl } from '../utils';

const ROOT = 'simulation';

const get = async (): Promise<SavedSimulation[]> => http.get(getUrl(ROOT));

const deleteSimulation = async (id: number) => http.delete(getUrl(ROOT, id));

const create = async (payload: SaveSimulationPayload) =>
  http.post(ROOT, payload);

const update = async (payload: UpdateSimulationPayload) =>
  http.patch(ROOT, payload);

export const simulation = { get, create, update, delete: deleteSimulation };

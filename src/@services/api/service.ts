import { type City, type Country, type Currency } from '@root/types';
import { score } from '@services/api/sections/score';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { http } from '../http.service';
import {
  authentication,
  community,
  compare,
  countries,
  flights,
  income,
  insights,
  notes,
  quality,
  scraping,
  wiki,
} from './sections';
import {
  type CityData,
  CostResponse,
  CurrencyList,
  EditUserPayload,
  GroupPayload,
  GroupResponse,
  LinkMetadataResponse,
  StatusResponse,
  UserPayload,
  UserResponse,
  UsersList,
  ValidateTokenResponse,
} from './types';
import { getUrl } from './utils';

const getUsers = (): Promise<UsersList> => http.get<UsersList>(getUrl('users'));

const getGroup = (
  id: string,
  token?: string,
  email?: string,
): Promise<GroupResponse> =>
  http.get<GroupResponse>(getUrl('group', id), { token, email });

const editGroup = (
  id: string,
  payload: GroupPayload,
): Promise<StatusResponse> => http.put(getUrl('group', id), payload);

const toggleGroupBookmark = (
  id: string,
  place: City | Country,
): Promise<StatusResponse> =>
  http.put(getUrl('group', id, 'bookmark'), { place });

const toggleGroupDestination = (
  id: string,
  place: City | Country,
): Promise<StatusResponse> =>
  http.put(getUrl('group', id, 'destination'), { place });

const signUp = (payload: UserPayload): Promise<StatusResponse> =>
  http.put(getUrl('users'), payload);

const editUser = (payload: EditUserPayload): Promise<UserResponse> =>
  http.patch(getUrl('users'), payload);

const getData = (): Promise<Record<City, CityData>> =>
  http.get<Record<City, CityData>>(getUrl('cities'));

const getCost = (id: City | Country): Promise<CostResponse> =>
  http.get(getUrl('cost', id));

const getCurrencies = (base: Currency): Promise<CurrencyList> =>
  http.get(getUrl('currencies', base));

const sendInvite = (email: string, group?: string): Promise<StatusResponse> =>
  http.put(getUrl('token'), { email, group });

const refreshToken = (): Promise<StatusResponse> =>
  http.put(getUrl('token', 'refresh'));

const validateToken = (
  email: string,
  token: string,
): Promise<ValidateTokenResponse> =>
  http.post(getUrl('token'), { email, token });

const getLinkMetadata = (link: string): Promise<LinkMetadataResponse> =>
  http.get(getUrl('link-metadata'), { link });

const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: Infinity,
  });

const useGroup = (group?: string, token?: string, email?: string) =>
  useQuery({
    queryKey: ['group', group, token, email],
    queryFn: () => getGroup(group!, token, email),
    staleTime: Infinity,
    enabled: !!group,
  });

const useCities = (enabled?: boolean): UseQueryResult<Record<City, CityData>> =>
  useQuery({
    queryKey: ['cities', enabled],
    queryFn: () => getData(),
    staleTime: Infinity,
    enabled,
  });

const apiService = {
  useUsers,
  useGroup,
  useCities,
  getCost,
  getCurrencies,
  sendInvite,
  refreshToken,
  validateToken,
  signUp,
  editUser,
  editGroup,
  toggleGroupBookmark,
  toggleGroupDestination,
  getLinkMetadata,
  authentication,
  income,
  scraping,
  flights,
  community,
  quality,
  wiki,
  insights,
  countries,
  compare,
  notes,
  score,
};

export default apiService;

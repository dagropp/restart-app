import { type City, type Country, type Currency } from '@root/types';
import { score } from '@services/api/sections/score';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Language, useTranslationsContext } from '@translations';

import { http } from '../http.service';
import {
  authentication,
  checklist,
  community,
  compare,
  countries,
  external,
  flags,
  flights,
  income,
  insights,
  language,
  notes,
  quality,
  scraping,
  simulation,
  users,
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
  ValidateTokenResponse,
} from './types';
import { getUrl } from './utils';

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

const getData = (language: Language): Promise<Record<City, CityData>> =>
  http.get<Record<City, CityData>>(getUrl('cities'), { language });

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

const useGroup = (group?: string, token?: string, email?: string) =>
  useQuery({
    queryKey: ['group', group, token, email],
    queryFn: () => getGroup(group!, token, email),
    staleTime: Infinity,
    enabled: !!group,
  });

const useCities = (
  enabled?: boolean,
): UseQueryResult<Record<City, CityData>> => {
  const { language } = useTranslationsContext();

  return useQuery({
    queryKey: ['cities', language, enabled],
    queryFn: () => getData(language),
    staleTime: Infinity,
    enabled,
  });
};

const apiService = {
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
  simulation,
  checklist,
  users,
  external,
  flags,
  language,
};

export default apiService;

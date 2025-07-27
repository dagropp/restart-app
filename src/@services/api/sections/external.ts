import { ExternalMapsApiResponse } from '@services/api';
import { useQuery } from '@tanstack/react-query';

import { http } from '../../http.service';
import { getUrl } from '../utils';

const ROOT = 'external';

const getMapsApiKey = (): Promise<ExternalMapsApiResponse> =>
  http.get(getUrl(ROOT, 'maps'));

const useMapsApiKey = () =>
  useQuery({
    queryKey: ['getMapsApiKey'],
    queryFn: getMapsApiKey,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

export const external = { useMapsApiKey };

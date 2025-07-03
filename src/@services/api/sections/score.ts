import { City } from '@root/types';
import { ScoreResponse } from '@services/api';
import { getUrl } from '@services/api/utils';
import { http } from '@services/http.service';
import { useQuery } from '@tanstack/react-query';
import { object } from '@utils/object.utils';

const defaultScoreItem = {
  average: 0,
  cost: 0,
  distance: 0,
  language: 0,
  qualityRank: 0,
  timezone: 0,
  visa: 0,
  weather: 0,
  urbanism: 0,
};

const defaultScores = object
  .values(City)
  .reduce(
    (result, item) => ({ ...result, [item]: defaultScoreItem }),
    {},
  ) as ScoreResponse;

const get = (): Promise<ScoreResponse> => http.get(getUrl('score'));

const useScores = (enabled?: boolean) => {
  const { data = defaultScores, ...query } = useQuery({
    queryKey: ['getScores', enabled],
    queryFn: () => get(),
    staleTime: Infinity,
    enabled,
  });
  return { data, ...query };
};

export const score = { use: useScores };

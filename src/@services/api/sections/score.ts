import { ScoreResponse } from '@services/api';
import { getUrl } from '@services/api/utils';
import { http } from '@services/http.service';
import { useQuery } from '@tanstack/react-query';

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

const defaultScores: ScoreResponse = {
  AMSTERDAM: defaultScoreItem,
  ATHENS: defaultScoreItem,
  AUCKLAND: defaultScoreItem,
  AUSTIN: defaultScoreItem,
  BARCELONA: defaultScoreItem,
  BASEL: defaultScoreItem,
  BENGALURU: defaultScoreItem,
  BERLIN: defaultScoreItem,
  BERN: defaultScoreItem,
  BOSTON: defaultScoreItem,
  BRATISLAVA: defaultScoreItem,
  BRISBANE: defaultScoreItem,
  BRUSSELS: defaultScoreItem,
  BUDAPEST: defaultScoreItem,
  CAMBRIDGE: defaultScoreItem,
  CHICAGO: defaultScoreItem,
  COPENHAGEN: defaultScoreItem,
  DENVER: defaultScoreItem,
  DUBAI: defaultScoreItem,
  DUBLIN: defaultScoreItem,
  EDINBURGH: defaultScoreItem,
  EINDHOVEN: defaultScoreItem,
  FRANKFURT: defaultScoreItem,
  GENEVA: defaultScoreItem,
  GLASGOW: defaultScoreItem,
  HAIFA: defaultScoreItem,
  HAMBURG: defaultScoreItem,
  HELSINKI: defaultScoreItem,
  JERUSALEM: defaultScoreItem,
  KRAKOW: defaultScoreItem,
  LARNACA: defaultScoreItem,
  LISBON: defaultScoreItem,
  LONDON: defaultScoreItem,
  LUXEMBOURG_CITY: defaultScoreItem,
  MADRID: defaultScoreItem,
  MANCHESTER: defaultScoreItem,
  MELBOURNE: defaultScoreItem,
  MILAN: defaultScoreItem,
  MONTREAL: defaultScoreItem,
  MUNICH: defaultScoreItem,
  NEW_YORK: defaultScoreItem,
  NICOSIA: defaultScoreItem,
  OSLO: defaultScoreItem,
  PARIS: defaultScoreItem,
  PRAGUE: defaultScoreItem,
  RIGA: defaultScoreItem,
  SAN_FRANCISCO: defaultScoreItem,
  SANTA_CLARA: defaultScoreItem,
  SEATTLE: defaultScoreItem,
  STOCKHOLM: defaultScoreItem,
  SYDNEY: defaultScoreItem,
  TALLINN: defaultScoreItem,
  TEL_AVIV: defaultScoreItem,
  TORONTO: defaultScoreItem,
  VANCOUVER: defaultScoreItem,
  VIENNA: defaultScoreItem,
  VILNIUS: defaultScoreItem,
  WARSAW: defaultScoreItem,
  ZURICH: defaultScoreItem,
};

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

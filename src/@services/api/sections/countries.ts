import { type Country } from '@root/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Language, useTranslationsContext } from '@translations';

import { http } from '../../http.service';
import { type CountryData, CountryResponse } from '../types';
import { getUrl } from '../utils';

const get = (language: Language): Promise<Record<Country, CountryData>> =>
  http.get(getUrl('countries'), { language });

const list = (language: Language): Promise<Record<Country, CountryResponse>> =>
  http.get(getUrl('countries', 'list'), { language });

const use = (): UseQueryResult<Record<Country, CountryData>> => {
  const { language } = useTranslationsContext();

  return useQuery({
    queryKey: ['countries', language],
    queryFn: () => get(language),
    staleTime: Infinity,
  });
};

const useList = (): UseQueryResult<Record<Country, CountryResponse>> => {
  const { language } = useTranslationsContext();

  return useQuery({
    queryKey: ['countriesList', language],
    queryFn: () => list(language),
    staleTime: Infinity,
  });
};

export const countries = { get, use, useList };

import { type Country } from '@root/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { http } from '../../http.service';
import { type CountryData, CountryResponse } from '../types';
import { getUrl } from '../utils';

const get = (): Promise<Record<Country, CountryData>> =>
  http.get(getUrl('countries'));

const list = (): Promise<Record<Country, CountryResponse>> =>
  http.get(getUrl('countries', 'list'));

const use = (): UseQueryResult<Record<Country, CountryData>> =>
  useQuery({
    queryKey: ['countries'],
    queryFn: () => get(),
    staleTime: Infinity,
  });

const useList = (): UseQueryResult<Record<Country, CountryResponse>> =>
  useQuery({
    queryKey: ['countriesList'],
    queryFn: () => list(),
    staleTime: Infinity,
  });

export const countries = { get, use, useList };

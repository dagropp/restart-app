import apiService, {
  ScrapingRecordsCommunity,
  ScrapingRecordsCostOfLiving,
  ScrapingRecordsCurrencies,
  ScrapingRecordsFlights,
  ScrapingRecordsIncomeLevels,
  ScrapingRecordsQualityOfLife,
  StatusResponse,
} from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { object } from '@utils/object.utils';
import { useEffect, useState } from 'react';

import { http } from '../../http.service';
import {
  ScrapingData,
  ScrapingStatusesResponse,
  ScrapingStatusResponse,
  ScrapingType,
} from '../types';
import { getUrl } from '../utils';

const get = (): Promise<ScrapingData[]> => http.get(getUrl('scraping'));

function getByType(
  type: ScrapingType.Community,
): Promise<ScrapingRecordsCommunity[]>;
function getByType(
  type: ScrapingType.CostOfLiving,
): Promise<ScrapingRecordsCostOfLiving[]>;
function getByType(
  type: ScrapingType.Currencies,
): Promise<ScrapingRecordsCurrencies[]>;
function getByType(
  type: ScrapingType.IncomeLevels,
): Promise<ScrapingRecordsIncomeLevels[]>;
function getByType(
  type: ScrapingType.Flights,
): Promise<ScrapingRecordsFlights[]>;
function getByType(
  type: ScrapingType.QualityOfLife,
): Promise<ScrapingRecordsQualityOfLife[]>;
function getByType(type: ScrapingType): Promise<object[]> {
  return http.get(getUrl('scraping', 'data', type));
}

const deleteData = (type: ScrapingType): Promise<StatusResponse> =>
  http.delete(getUrl('scraping', type));

const put = (type: ScrapingType): Promise<ScrapingStatusResponse> =>
  http.put(getUrl('scraping', 'update', type));

const status = (type: ScrapingType): Promise<ScrapingStatusResponse> =>
  http.get(getUrl('scraping', 'status', type));

const allStatuses = (): Promise<ScrapingStatusesResponse> =>
  http.get(getUrl('scraping', 'status'));

const useAllStatuses = (isFetchingTriggered?: boolean) => {
  const [isFetching, setIsFetching] = useState(isFetchingTriggered);

  const query = useQuery({
    queryKey: ['getAllStatuses'],
    queryFn: () => apiService.scraping.allStatuses(),
    refetchInterval: isFetching ? 1000 : 30_000,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isFetchingTriggered) setIsFetching(isFetchingTriggered);
  }, [isFetchingTriggered]);

  useEffect(() => {
    if (query.data) {
      const isSomeFetching = object
        .values(query.data)
        .some((status) => status.isPending);
      setIsFetching(isSomeFetching);
    }
  }, [query.data]);

  return query;
};

const useData = () =>
  useQuery({
    queryKey: ['getScrapingData'],
    queryFn: () => apiService.scraping.get(),
  });

export const scraping = {
  get,
  put,
  status,
  allStatuses,
  useAllStatuses,
  useData,
  deleteData,
  getByType,
};

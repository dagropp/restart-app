import { ChildrenPayload } from '@services/api';
import { Entry, object } from '@utils/object.utils';
import { useSearchParams } from 'react-router';

import { TokenQuery } from './types';

const parseQueryParams = (params: URLSearchParams): TokenQuery =>
  object.fromEntries(params as unknown as Entry<TokenQuery>[]) ?? {};

export const useTokenParams = (): TokenQuery => {
  const [searchParams] = useSearchParams();
  return parseQueryParams(searchParams);
};

export const parseChildren = (items: FormDataEntryValue[]) => {
  const mapFn = (item: FormDataEntryValue) => {
    try {
      return JSON.parse(String(item)) as ChildrenPayload;
    } catch {
      return null;
    }
  };

  return items.map(mapFn).filter(Boolean) as ChildrenPayload[];
};

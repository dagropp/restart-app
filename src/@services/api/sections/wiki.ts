import { useQuery } from '@tanstack/react-query';

import { http } from '../../http.service';
import { WikiTitleSummary } from '../types';

const ROOT = 'https://en.wikipedia.org/api/rest_v1/page';

const getUrl = (...sections: string[]) => [ROOT, ...sections].join('/');

const summary = (city: string): Promise<WikiTitleSummary> =>
  http.get(getUrl('summary', city), undefined, false);

const useSummary = (key?: string, enabled: boolean = true) =>
  useQuery({
    queryKey: ['getWikiSummary', key, enabled],
    queryFn: () => summary(key!),
    staleTime: Infinity,
    enabled: !!key && enabled,
  });

export const wiki = { summary, useSummary };

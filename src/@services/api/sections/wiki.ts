import { useQuery } from '@tanstack/react-query';
import { type Language } from '@translations';

import { http } from '../../http.service';
import { WikiTitleSummary } from '../types';

const getUrl = (language: Language, ...sections: string[]) =>
  [`https://${language}.wikipedia.org/api/rest_v1/page`, ...sections].join('/');

const summary = (city: string, language: Language): Promise<WikiTitleSummary> =>
  http.get(getUrl(language, 'summary', city), undefined, false);

const useSummary = (
  language: Language,
  key?: string,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: ['getWikiSummary', key, enabled],
    queryFn: () => summary(key!, language),
    staleTime: Infinity,
    enabled: !!key && enabled,
  });

export const wiki = { summary, useSummary };

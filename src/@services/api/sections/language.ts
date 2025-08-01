import { type Language as LanguageCode } from '@root/types';
import { LanguageDataResponse } from '@services/api';
import { getUrl } from '@services/api/utils';
import { http } from '@services/http.service';
import { useQuery } from '@tanstack/react-query';
import {
  type Language as TranslatedLanguage,
  useTranslationsContext,
} from '@translations';

const ROOT = 'language';

const get = (
  code: LanguageCode,
  language: TranslatedLanguage,
): Promise<LanguageDataResponse> => http.get(getUrl(ROOT, code), { language });

const use = (code: LanguageCode) => {
  const { language } = useTranslationsContext();

  return useQuery({
    queryKey: ['getLanguageData', code, language],
    queryFn: () => get(code, language),
    staleTime: Infinity,
  });
};

export const language = { use };

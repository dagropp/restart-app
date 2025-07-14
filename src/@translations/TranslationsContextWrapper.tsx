import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import storageService from '@services/storage';
import { useQuery } from '@tanstack/react-query';
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { rtlLanguages } from './constants';
import { defaultTranslations } from './defaultTranslations';
import { TranslationsContext } from './TranslationsContext';
import { ITranslations, Language } from './types';

export const TranslationsContextWrapper = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>(
    storageService.get('language'),
  );

  const isRtl = useMemo(() => rtlLanguages.has(language), [language]);

  const { data: translations = defaultTranslations } = useQuery({
    queryKey: ['getTranslations', language],
    queryFn: async () => {
      const module = await import(`./data/${language}.json`);
      return module.default as ITranslations;
    },
  });

  useEffect(() => {
    storageService.set('language', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TranslationsContext value={{ language, setLanguage, translations, isRtl }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
        {children}
      </LocalizationProvider>
    </TranslationsContext>
  );
};

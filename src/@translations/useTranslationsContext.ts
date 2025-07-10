import { useContext } from 'react';

import { TranslationsContext } from './TranslationsContext';

export const useTranslationsContext = () => useContext(TranslationsContext);

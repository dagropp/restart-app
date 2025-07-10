import { ITranslations } from './types';
import { useTranslationsContext } from './useTranslationsContext';

export const useTranslations = (): ITranslations =>
  useTranslationsContext().translations;

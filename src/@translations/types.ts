import { defaultTranslations } from './defaultTranslations';

export type ITranslations = typeof defaultTranslations;

export type Language = 'en' | 'he';

export interface ITranslationsContext {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: ITranslations;
  isRtl: boolean;
}

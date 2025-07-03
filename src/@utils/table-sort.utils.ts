import type { TableColumn } from '@common/Table';
import {
  type Currency,
  EuUnionStatus,
  type Language,
  VisaLevel,
} from '@root/types';
import { languageMap } from '@shared/LanguageDisplay';
import { ITranslations } from '@translations';

const visaLevelScore: Record<VisaLevel, number> = {
  [VisaLevel.None]: 2,
  [VisaLevel.Easy]: 1,
  [VisaLevel.Medium]: 0,
};

const getIsEuSorter =
  <T extends object>(
    getValue: (row: T) => EuUnionStatus,
  ): TableColumn<T>['sorter'] =>
  (direction) =>
  (a, b) => {
    const aValue = getValue(a) === EuUnionStatus.Yes ? 1 : 0;
    const bValue = getValue(b) === EuUnionStatus.Yes ? 1 : 0;
    return (bValue - aValue) * direction;
  };

const getVisaLevelSorter =
  <T extends object>(
    getValue: (row: T) => VisaLevel,
  ): TableColumn<T>['sorter'] =>
  (direction) =>
  (a, b) => {
    const aValue = visaLevelScore[getValue(a)];
    const bValue = visaLevelScore[getValue(b)];
    return (bValue - aValue) * direction;
  };

const getCurrencySorter =
  <T extends object>(
    getValue: (row: T) => Currency,
    translations: ITranslations,
  ): TableColumn<T>['sorter'] =>
  (direction) =>
  (a, b) => {
    const aValue = translations.enum.currency[getValue(a)];
    const bValue = translations.enum.currency[getValue(b)];
    return aValue.localeCompare(bValue) * direction;
  };

const getLanguageSorter =
  <T extends object>(
    getValue: (row: T) => Language | Language[],
    translations: ITranslations,
  ): TableColumn<T>['sorter'] =>
  (direction) =>
  (a, b) => {
    const languageA = getValue(a);
    const languageB = getValue(b);
    const parsedLanguageA = Array.isArray(languageA) ? languageA[0] : languageA;
    const parsedLanguageB = Array.isArray(languageB) ? languageB[0] : languageB;
    const aValue =
      translations.enum.language[parsedLanguageA] ||
      languageMap[parsedLanguageA];
    const bValue =
      translations.enum.language[parsedLanguageB] ||
      languageMap[parsedLanguageB];
    return aValue.localeCompare(bValue) * direction;
  };

export const tableSort = {
  getIsEuSorter,
  getVisaLevelSorter,
  getCurrencySorter,
  getLanguageSorter,
};

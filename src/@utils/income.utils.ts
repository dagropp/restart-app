import { IncomeType } from '@root/types';
import { CityData } from '@services/api';
import { type ITranslations } from '@translations';

interface IncomeTypeData {
  title: string;
  subtitle?: string;
  getLink?: (data: CityData) => string;
  linkTitle?: string;
}

const typeMap: Record<
  IncomeType,
  Omit<IncomeTypeData, 'title' | 'subtitle'>
> = {
  [IncomeType.None]: {},
  [IncomeType.Other]: {
    getLink: ({ costOfLivingKey }) =>
      `https://www.numbeo.com/cost-of-living/in/${costOfLivingKey}`,
    linkTitle: 'Cost of Living',
  },
  [IncomeType.SocialWorker]: {
    getLink: () => `temp`,
    linkTitle: 'SalaryExperts',
  },
  [IncomeType.Doctor]: {
    getLink: () => `temp`,
    linkTitle: 'SalaryExperts',
  },
  [IncomeType.SoftwareEngineerEntry]: {
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineer/levels/entry-level/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.SoftwareEngineerSenior]: {
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineer/levels/senior/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.SoftwareEngineerManager]: {
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineering-manager/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.ProductDesigner]: {
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/product-designer/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.ProductManager]: {
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/product-manager/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
};

const getTypeData = (
  type: IncomeType,
  translations: ITranslations,
): IncomeTypeData => {
  const translated = translations.enum.income[type];
  return { ...translated, ...typeMap[type] };
};

export const incomeUtils = { getTypeData };

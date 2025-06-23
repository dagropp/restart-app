import { IncomeType } from '@root/types';
import { CityData } from '@services/api';

interface IncomeTypeData {
  title: string;
  subtitle?: string;
  getLink?: (data: CityData) => string;
  linkTitle?: string;
}

const typeMap: Record<IncomeType, IncomeTypeData> = {
  [IncomeType.None]: { title: 'None' },
  [IncomeType.Other]: {
    title: 'Other',
    subtitle: "Based on the city's average income",
    getLink: ({ costOfLivingKey }) =>
      `https://www.numbeo.com/cost-of-living/in/${costOfLivingKey}`,
    linkTitle: 'Cost of Living',
  },
  [IncomeType.SocialWorker]: {
    title: 'Social Worker',
    getLink: () => `temp`,
    linkTitle: 'SalaryExperts',
  },
  [IncomeType.Doctor]: {
    title: 'Doctor',
    getLink: () => `temp`,
    linkTitle: 'SalaryExperts',
  },
  [IncomeType.SoftwareEngineerEntry]: {
    title: 'Software Engineer',
    subtitle: 'Junior/Mid-senior',
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineer/levels/entry-level/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.SoftwareEngineerSenior]: {
    title: 'Software Engineer',
    subtitle: 'Senior/Principal',
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineer/levels/senior/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.SoftwareEngineerManager]: {
    title: 'Software Engineering Manager',
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/software-engineering-manager/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.ProductDesigner]: {
    title: 'Product Designer',
    subtitle: 'UI / UX',
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/product-designer/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
  [IncomeType.ProductManager]: {
    title: 'Product Manager',
    getLink: ({ incomeLevelKey }) =>
      `https://www.levels.fyi/t/product-manager/locations/${incomeLevelKey}`,
    linkTitle: 'Levels.fyi',
  },
};

export const incomeUtils = { typeMap };

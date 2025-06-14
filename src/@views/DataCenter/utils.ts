import { ScrapingType } from '@services/api';
import { DataFreshness } from '@views/DataCenter/types.ts';
import dayjs from 'dayjs';

export const scrapingTypeMap: Record<ScrapingType, string> = {
  [ScrapingType.CostOfLiving]: 'Cost of Living',
  [ScrapingType.Currencies]: 'Currencies',
  [ScrapingType.IncomeLevels]: 'Income Levels',
  [ScrapingType.QualityOfLife]: 'Quality of Life',
  [ScrapingType.Flights]: 'Flights',
  [ScrapingType.Community]: 'Community',
};

export const getDataFreshness = (
  records: number,
  lastUpdate: string[],
): DataFreshness => {
  if (!records) return DataFreshness.Empty;

  const date = dayjs(lastUpdate?.[0]);
  const diff = Math.abs(date.diff(dayjs(), 'days'));

  if (lastUpdate?.[0] && diff < 1) return DataFreshness.Fresh;
  if (lastUpdate?.[0] && diff >= 1 && diff < 7) return DataFreshness.Standard;
  return DataFreshness.Outdated;
};

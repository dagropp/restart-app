import { Region, ValidRegion } from '@root/types';

const map: Record<ValidRegion, string> = {
  [Region.EUROPE]: 'Europe',
  [Region.NORTH_AMERICA]: 'North America',
  [Region.ASIA]: 'Asia & Middle-East',
  [Region.OCEANIA]: 'Oceania',
};

export const regions = { map };

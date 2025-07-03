import { type ValidRegion, type VisaLevel } from '@root/types';

export interface CountriesFilters {
  regions: ValidRegion[];
  visa: VisaLevel[];
  english: number;
}

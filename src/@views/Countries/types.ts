import { ValidRegion, VisaLevel } from '@services/api';

export interface CountriesFilters {
  regions: ValidRegion[];
  visa: VisaLevel[];
  english: number;
}

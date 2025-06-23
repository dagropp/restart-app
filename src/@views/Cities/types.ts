import { type Country, type ValidRegion, type VisaLevel } from '@root/types';

export interface CitiesFilters {
  regions: ValidRegion[];
  visa: VisaLevel[];
  minRating: number;
  countries: Country[];
  english: number;
}

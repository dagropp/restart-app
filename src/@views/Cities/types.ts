import { Country, ValidRegion, VisaLevel } from '@services/api';

export interface CitiesFilters {
  regions: ValidRegion[];
  visa: VisaLevel[];
  minRating: number;
  countries: Country[];
  english: number;
}

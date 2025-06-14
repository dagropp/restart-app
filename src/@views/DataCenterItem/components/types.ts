import { City, CityData } from '@services/api';

export interface ScrapingTableProps {
  cities: Record<City, CityData>;
}

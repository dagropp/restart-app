import { CityData, CostResponse, type CountryResponse } from '@services/api';
import { type ReactNode } from 'react';

export interface ICountriesContext {
  item: CountryResponse;
  cost: CostResponse;
  cities: CityData[];
}

export interface CountryContextWrapperProps {
  value: ICountriesContext;
  children: ReactNode;
}

import {
  type CityData,
  type CommunityResponse,
  type CostNegativeState,
  type CostPositiveState,
  type CostResponse,
  type FlightsResponse,
  type IncomeResponse,
} from '@services/api';
import { CurrencyConverter } from '@utils/format.utils';
import { ActionDispatch, type ReactNode } from 'react';

export interface ICityContext {
  item: CityData;
  cost: CostResponse;
  income: IncomeResponse;
  partnerIncome?: IncomeResponse;
  flights?: FlightsResponse;
  community?: CommunityResponse;
  currencyConverter: CurrencyConverter;
}

export interface CostRow {
  label: string;
  onEdit?: () => void;
  optional?: boolean;
  mapper?: (value: number) => number;
  tooltip?: string;
}

export interface ICostContext {
  negative: CostRowsList<CostNegativeState>;
  positive: CostRowsList<CostPositiveState>;
  negativeState: CostNegativeState;
  updateNegativeState: ActionDispatch<[update: Partial<CostNegativeState>]>;
  positiveState: CostPositiveState;
  updatePositiveState: ActionDispatch<[update: Partial<CostPositiveState>]>;
}

export type CostRowsList<T> = Record<keyof T | string, CostRow>;

export interface CityContextWrapperProps {
  value: ICityContext;
  children: ReactNode;
}

export interface CostContextWrapperProps {
  children: ReactNode;
}

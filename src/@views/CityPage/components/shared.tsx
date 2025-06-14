import { Currency } from '@services/api';
import { CurrencyConverter, formatCurrency } from '@utils/format.utils';

export const formatSliderHandle = (
  value: number,
  currency: Currency,
  currencyConverter: CurrencyConverter,
) => (
  <div className="flex flex-col">
    <span>{formatCurrency(value, currency)}</span>
    <span className="text-xs">{currencyConverter(value)}</span>
  </div>
);

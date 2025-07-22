import { Currency } from '@root/types';
import { CurrencyList } from '@services/api';
import currencyService from '@services/currency';

import { number } from './number.utils';
import { object } from './object.utils';

const units = ['', 'K', 'M', 'B', 'T']; // Define units for thousands, millions, etc.

export type CurrencyConverter = (value: number, round?: boolean) => string;

export type CurrencyConverterToNumber = (value: number) => number;

export type HardCurrencyConverter = (
  value: number,
  round?: boolean,
) => { formatted: string; original: number };

const shortNumber = (
  value: number,
  sensitivity: number = 10_000,
  precision: number = 1,
): string => {
  const prefix = value < 0 ? '-' : '';
  value = Math.abs(value);
  if (value < sensitivity)
    return prefix + Number(number.toFixed(value, precision)).toLocaleString();

  let unitIndex = 0;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  return `${prefix}${number.toFixed(value, precision)}${units[unitIndex]}`;
};

export const formatCurrency = (
  value: number,
  code: Currency,
  round?: boolean,
): string => {
  const converted = round ? Math.round(value) : value;
  return `${currencyService.map[code].symbol}${shortNumber(converted)}`;
};

export const convertCurrency =
  (
    currencies: CurrencyList,
    base: Currency,
    currency: Currency,
  ): CurrencyConverter =>
  (value: number, round?: boolean) => {
    if (!currencies) return formatCurrency(value, currency, round);

    const multiplier = currencies[currency as keyof CurrencyList] ?? 1;
    return formatCurrency(value / multiplier, base, round);
  };

export const convertCurrencyToNumber = (
  currencies: CurrencyList,
  currency: Currency,
): CurrencyConverterToNumber => {
  const multiplier = currencies[currency as keyof CurrencyList] ?? 1;
  return (value: number) => value / multiplier;
};

export const convertHardCurrency =
  (
    currencies: CurrencyList,
    base: Currency,
    currency: Currency,
  ): HardCurrencyConverter =>
  (value: number, round?: boolean) => {
    const convertedCurrencies = {} as CurrencyList;
    const ref = currencies[base];
    for (const [key, value] of object.entries(currencies)) {
      convertedCurrencies[key] = value / ref;
    }

    const multiplier = convertedCurrencies[currency as keyof CurrencyList] ?? 1;
    const original = value / multiplier;
    return { formatted: formatCurrency(original, base, round), original };
  };

export const format = { shortNumber };

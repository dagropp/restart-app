import { Country, Currency } from '@root/types';

import { type CurrencyData } from './currency.types';

export const map: Record<Currency, CurrencyData> = {
  [Currency.AED]: {
    symbol: 'د.إ',
    flag: Country.UNITED_ARAB_EMIRATES,
  },
  [Currency.AUD]: {
    symbol: 'A$',
    flag: Country.AUSTRALIA,
  },
  [Currency.CAD]: {
    symbol: 'C$',
    flag: Country.CANADA,
  },
  [Currency.CHF]: {
    symbol: 'Fr.',
    flag: Country.SWITZERLAND,
  },
  [Currency.CZK]: {
    symbol: 'Kč',
    flag: Country.CZECH_REPUBLIC,
  },
  [Currency.DKK]: {
    symbol: 'kr.',
    flag: Country.DENMARK,
  },
  [Currency.EUR]: {
    symbol: '€',
    flag: 'EU',
  },
  [Currency.GBP]: {
    symbol: '£',
    flag: Country.UNITED_KINGDOM,
  },
  [Currency.HUF]: {
    symbol: 'Ft.',
    flag: Country.HUNGARY,
  },
  [Currency.ILS]: {
    symbol: '₪',
    flag: Country.ISRAEL,
  },
  [Currency.INR]: {
    symbol: '₹',
    flag: Country.INDIA,
  },
  [Currency.NOK]: {
    symbol: 'kr.',
    flag: Country.NORWAY,
  },
  [Currency.NZD]: {
    symbol: 'NZ$',
    flag: Country.NEW_ZEALAND,
    element: <span className="text-[70%]">NZ$</span>,
  },
  [Currency.PLN]: {
    symbol: 'zł',
    flag: Country.POLAND,
  },
  [Currency.SEK]: {
    symbol: 'kr.',
    flag: Country.SWEDEN,
  },
  [Currency.USD]: {
    symbol: '$',
    flag: Country.UNITED_STATES,
  },
};

export const order = [Currency.ILS, Currency.USD, Currency.EUR];

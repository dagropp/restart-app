import { Country, Currency } from '@root/types';

import { type CurrencyData } from './currency.types';

export const map: Record<Currency, CurrencyData> = {
  [Currency.AED]: {
    name: 'UAE Dirham',
    symbol: 'د.إ',
    flag: Country.UNITED_ARAB_EMIRATES,
  },
  [Currency.AUD]: {
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: Country.AUSTRALIA,
  },
  [Currency.CAD]: {
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: Country.CANADA,
  },
  [Currency.CHF]: {
    name: 'Swiss Franc',
    symbol: 'Fr.',
    flag: Country.SWITZERLAND,
  },
  [Currency.CZK]: {
    name: 'Czech Koruna',
    symbol: 'Kč',
    flag: Country.CZECH_REPUBLIC,
  },
  [Currency.DKK]: {
    name: 'Danish Krone',
    symbol: 'kr.',
    flag: Country.DENMARK,
  },
  [Currency.EUR]: {
    name: 'Euro',
    symbol: '€',
    flag: 'EU',
  },
  [Currency.GBP]: {
    name: 'Pound Sterling',
    symbol: '£',
    flag: Country.UNITED_KINGDOM,
  },
  [Currency.HUF]: {
    name: 'Hungarian Forint',
    symbol: 'Ft.',
    flag: Country.HUNGARY,
  },
  [Currency.ILS]: {
    name: 'Israeli Shekel',
    symbol: '₪',
    flag: Country.ISRAEL,
  },
  [Currency.INR]: {
    name: 'Indian Rupee',
    symbol: '₹',
    flag: Country.INDIA,
  },
  [Currency.NOK]: {
    name: 'Norwegian Krone',
    symbol: 'kr.',
    flag: Country.NORWAY,
  },
  [Currency.NZD]: {
    name: 'NZ Dollar',
    symbol: 'NZ$',
    flag: Country.NEW_ZEALAND,
    element: <span className="text-[70%]">NZ$</span>,
  },
  [Currency.PLN]: {
    name: 'Polish Złoty',
    symbol: 'zł',
    flag: Country.POLAND,
  },
  [Currency.SEK]: {
    name: 'Swedish Krona',
    symbol: 'kr.',
    flag: Country.SWEDEN,
  },
  [Currency.USD]: {
    name: 'US Dollar',
    symbol: '$',
    flag: Country.UNITED_STATES,
  },
};

export const order = [Currency.ILS, Currency.USD, Currency.EUR];

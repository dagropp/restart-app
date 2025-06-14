import { useAppContext } from '@context/app';
import apiService, {
  City,
  CityData,
  Country,
  CountryResponse,
  Currency,
} from '@services/api';
import { convertCurrency, formatCurrency } from '@utils/format.utils';

interface Props {
  value?: number;
  id?: City | Country;
}

const getItemCurrency = (
  id?: City | Country,
  cities?: Record<City, CityData> | undefined,
  countries?: Record<Country, CountryResponse>,
): Currency | null => {
  if (id && cities && countries) {
    if (id in City) return cities[id as City].country.currency;
    if (id in Country) return countries[id as Country].currency;
  }
  return null;
};

export const CurrencyValueCell = ({ value, id }: Props) => {
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();
  const { currency: ctxCurrency, currencies } = useAppContext();

  const currency = getItemCurrency(id, cities, countries);

  if (!value || !currency) return null;

  const converter = convertCurrency(currencies, ctxCurrency, currency);

  return (
    <span>
      {formatCurrency(value, currency)} / {converter(value)}
    </span>
  );
};

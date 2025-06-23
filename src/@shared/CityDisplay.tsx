import Typography from '@common/Typography';
import { City, Country } from '@root/types';
import apiService from '@services/api';
import { CountryImage } from '@shared/CountryDisplay';

interface CityWithDataProps {
  country: Country;
  name: string;
}

interface CityByIdProps {
  id: City;
}

type Props = CityWithDataProps | CityByIdProps;

const CityWithData = ({ country, name }: CityWithDataProps) => (
  <div className="flex items-center gap-2">
    <CountryImage country={country} className="h-4" />
    <Typography variant="body2">{name}</Typography>
  </div>
);

const CityById = ({ id }: CityByIdProps) => {
  const { data: cities } = apiService.useCities();
  if (!cities) return null;
  const city = cities[id];

  return <CityWithData country={city.country.id} name={city.name} />;
};

export const CityDisplay = (props: Props) =>
  'id' in props ? <CityById {...props} /> : <CityWithData {...props} />;

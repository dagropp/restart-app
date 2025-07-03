import apiService from '@services/api';
import GoogleMapCard from '@shared/GoogleMapCard';
import { useCityContext } from '@views/CityPage/context';

export const CityGoogleMapCard = () => {
  const {
    item: { name, country, airport, satelliteCity },
  } = useCityContext();
  const { data: cities } = apiService.useCities();

  const destination = satelliteCity && cities && cities[satelliteCity].name;

  return (
    <GoogleMapCard
      params={{ place: `${name},${country.name}`, airport, destination }}
      zoom={10}
    />
  );
};

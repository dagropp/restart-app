import { City } from '@root/types';
import { CityData } from '@services/api';
import { object } from '@utils/object.utils';

export const findComparisonCity = (
  item: CityData,
  cities: Record<City, CityData>,
) => {
  const list = object.values(cities).filter((city) => item.id !== city.id);

  const inCountry = list.find(
    (city) =>
      city.country.id === item.country.id && city.id !== item.satelliteCity,
  );
  if (inCountry) return inCountry.id;

  const inRegion = list.find((city) =>
    city.country.regions.some((region) =>
      item.country.regions.includes(region),
    ),
  );
  if (inRegion) return inRegion.id;

  return City.TEL_AVIV;
};

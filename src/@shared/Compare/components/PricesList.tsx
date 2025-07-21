import Typography from '@common/Typography';
import { City } from '@root/types.ts';
import apiService from '@services/api';
import { useTranslations } from '@translations';

interface Props {
  city?: City;
  other?: City;
}

export const PricesList = ({ city, other }: Props) => {
  const { data: thisCityCost } = apiService.useCost(city);
  const { data: otherCityCost } = apiService.useCost(other);
  const { data: cities } = apiService.useCities();
  const translations = useTranslations().city.prices;

  const thisCity = cities && city && cities[city];
  const otherCity = cities && other && cities[other];

  if (!thisCity || !otherCity || !thisCityCost || !otherCityCost) return null;

  return (
    <>
      <Typography variant="h6" className="col-span-3 text-center py-5">
        {translations.title}
      </Typography>
    </>
  );
};

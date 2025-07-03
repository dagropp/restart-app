import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { interpolateTranslations, useTranslations } from '@translations';
import { format } from '@utils/format.utils';
import { number } from '@utils/number.utils';

import { useCityContext } from '../../../context';

export const CityPopulation = () => {
  const {
    item: { population, country },
  } = useCityContext();
  const translations = useTranslations().generalSection;

  const percentage = number.toFixed((population / country.population) * 100);
  const tooltip = interpolateTranslations(translations.populationRelativity, {
    population: Math.round(population).toLocaleString(),
    percentage,
  });

  return (
    <Tooltip title={tooltip} placement="left">
      <Typography variant="body2">
        {format.shortNumber(population, 10_000, 2)}
      </Typography>
    </Tooltip>
  );
};

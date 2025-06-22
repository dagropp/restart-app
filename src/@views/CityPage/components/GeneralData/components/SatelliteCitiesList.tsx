import Link from '@common/Link';
import Typography from '@common/Typography';
import apiService from '@services/api';
import { useCityContext } from '@views/CityPage/context';
import { Fragment } from 'react';

export const SatelliteCitiesList = () => {
  const {
    item: { satelliteChildren },
  } = useCityContext();
  const { data: cities } = apiService.useCities();

  if (!cities) return null;

  return (
    <Typography variant="body2">
      {satelliteChildren.map((city, index) => (
        <Fragment key={city}>
          <Link href={`/city/${city}`}>{cities[city].name}</Link>
          {index !== satelliteChildren.length - 1 && ', '}
        </Fragment>
      ))}
    </Typography>
  );
};

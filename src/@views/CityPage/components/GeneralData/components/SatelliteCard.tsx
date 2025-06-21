import Link from '@common/Link';
import Typography from '@common/Typography';
import CommuteRoundedIcon from '@mui/icons-material/CommuteRounded';
import EmojiTransportationRoundedIcon from '@mui/icons-material/EmojiTransportationRounded';
import { alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import apiService from '@services/api';
import dateService from '@services/date.service';
import { GeneralDataItem } from '@shared/GeneralDataCard';
import SectionCard from '@shared/SectionCard';

import { useCityContext } from '../../../context';

export const SatelliteCard = () => {
  const {
    item: { satelliteCity, satelliteDistance },
  } = useCityContext();
  const theme = useTheme();

  const { data: cities } = apiService.useCities();

  if (!cities || !satelliteCity || !satelliteDistance) return null;

  const city = cities[satelliteCity];

  return (
    <SectionCard
      className="mb-4 !border-none"
      style={{ backgroundColor: alpha(theme.palette.info.light, 0.2) }}
    >
      <div className="flex flex-col gap-4">
        <GeneralDataItem
          label="Metropolitan Center"
          display={
            <Typography variant="body2">
              <Link href={`/city/${city.id}`}>{city.name}</Link>
            </Typography>
          }
          Icon={EmojiTransportationRoundedIcon}
        />
        <GeneralDataItem
          label="Commute Time"
          display={
            <Typography variant="body2">
              {dateService.getTimeByMinutes(satelliteDistance)}
            </Typography>
          }
          Icon={CommuteRoundedIcon}
        />
      </div>
    </SectionCard>
  );
};

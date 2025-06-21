import Typography from '@common/Typography';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import ThunderstormRoundedIcon from '@mui/icons-material/ThunderstormRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import Box from '@mui/material/Box';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import dateService from '@services/date.service';
import SectionCard from '@shared/SectionCard';
import { interpolateTranslations, useTranslations } from '@translations';
import { array } from '@utils/array.utils';
import { number } from '@utils/number.utils';
import { object } from '@utils/object.utils';

import { useCityContext } from '../context';

enum Season {
  Fall = 'Fall',
  Winter = 'Winter',
  Spring = 'Spring',
  Summer = 'Summer',
}

const getTempColor = (temp: number) => {
  const minTemp = -10;
  const maxTemp = 40;
  const normalized = (temp - minTemp) / (maxTemp - minTemp);

  let hue;
  if (normalized < 0.4) {
    // Stay blue longer (from 200 to ~90)
    hue = 200 - normalized * 250;
  } else {
    // Transition faster from yellow to red
    hue = 90 - (normalized - 0.4) * 180;
  }

  return `hsl(${Math.max(0, hue)}, 100%, 50%, 0.5)`;
};

const map: Record<Season, number[]> = {
  [Season.Fall]: [8, 9, 10],
  [Season.Winter]: [11, 0, 1],
  [Season.Spring]: [2, 3, 4],
  [Season.Summer]: [5, 6, 7],
};

interface WeatherItemProps {
  season: Season;
}

interface StatsItemProps {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
  caption: string;
}

const WeatherItem = ({ season }: WeatherItemProps) => {
  const {
    item: { weather },
  } = useCityContext();
  const translations = useTranslations().enum.season;
  const indices = map[season];
  const label = translations[season];
  const min = Math.round(
    number.average(...array.getIndices(weather.minTemp, indices)),
  );
  const max = Math.round(
    number.average(...array.getIndices(weather.maxTemp, indices)),
  );

  return (
    <div className="flex flex-col">
      <Typography variant="caption" className="uppercase text-center p-2">
        <strong>{label}</strong>
      </Typography>
      <Box
        className="flex items-center gap-2 flex-col p-2 mx-auto rounded"
        sx={{
          background: `linear-gradient(to bottom, ${getTempColor(max)}, ${getTempColor(min)})`,
        }}
      >
        <Typography
          variant="subtitle1"
          className="flex items-center justify-between gap-4 w-full"
        >
          <span>{max}°</span>
          <WbSunnyRoundedIcon fontSize="small" />
        </Typography>
        <Typography
          variant="subtitle1"
          className="flex items-center justify-between gap-4 w-full"
        >
          <span>{min}°</span>
          <BedtimeRoundedIcon fontSize="small" />
        </Typography>
      </Box>
    </div>
  );
};

const StatsItem = ({ label, Icon, caption }: StatsItemProps) => {
  return (
    <Typography variant="body2" className="contents">
      <Icon fontSize="small" />
      <span>
        {label} <Typography variant="caption">({caption})</Typography>
      </span>
    </Typography>
  );
};

export const WeatherDisplay = () => {
  const {
    item: { weather },
  } = useCityContext();
  const translations = useTranslations().city.weather;

  const rainDays = number.sum(...weather.rainyDays);
  const maxSunHours = dateService.getTimeByMinutes(
    weather.sunHours[5] * 60,
    true,
  );
  const minSunHours = dateService.getTimeByMinutes(
    weather.sunHours[11] * 60,
    true,
  );

  return (
    <SectionCard title={translations.title} TitleIcon={AirRoundedIcon}>
      <div className="mx-auto w-max">
        <div className="mx-auto w-max grid grid-cols-[max-content_1fr] gap-2">
          <StatsItem
            Icon={ThunderstormRoundedIcon}
            label={interpolateTranslations(translations.rainTitle, {
              count: rainDays,
            })}
            caption={interpolateTranslations(translations.rainSubtitle, {
              percent: Math.round((rainDays / 365) * 100),
            })}
          />
          <StatsItem
            Icon={LightModeRoundedIcon}
            label={interpolateTranslations(translations.sunlightMax, {
              count: maxSunHours,
            })}
            caption={interpolateTranslations(translations.sunlightSubtitle, {
              percent: Math.round((weather.sunHours[5] / 24) * 100),
            })}
          />
          <StatsItem
            Icon={DarkModeRoundedIcon}
            label={interpolateTranslations(translations.sunlightMin, {
              count: minSunHours,
            })}
            caption={interpolateTranslations(translations.sunlightSubtitle, {
              percent: Math.round((weather.sunHours[11] / 24) * 100),
            })}
          />
        </div>

        <div className="flex gap-2">
          {object.values(Season).map((season) => (
            <WeatherItem key={season} season={season} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
};

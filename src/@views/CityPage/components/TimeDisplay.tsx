import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import BedtimeRoundedIcon from '@mui/icons-material/BedtimeRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import WbTwilightRoundedIcon from '@mui/icons-material/WbTwilightRounded';
import Box from '@mui/material/Box';
import dateService from '@services/date.service';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import dayjs, { type Dayjs } from 'dayjs';
import { type ReactNode } from 'react';

import { useCityContext } from '../context';

type Hour = 8 | 12 | 17 | 20 | 0;

interface Props {
  hour: Hour;
}

interface HourData {
  icon: ReactNode;
  date: Dayjs;
  background: string;
}

const hourData: Record<Hour, HourData> = {
  8: {
    icon: <WbTwilightRoundedIcon className="text-[#FFAB91]" />,
    date: dateService.getDateByHour(8),
    background: 'rgba(255, 255, 141, 0.5)',
  },
  12: {
    icon: <WbSunnyRoundedIcon className="text-[#FFCA28]" />,
    date: dateService.getDateByHour(12),
    background: 'rgba(225, 245, 254, 0.5)',
  },
  17: {
    icon: <WbTwilightRoundedIcon className="text-[#FF7043]" />,
    date: dateService.getDateByHour(16),
    background: 'rgba(2, 136, 209, 0.5)',
  },
  20: {
    icon: <BedtimeRoundedIcon className="text-[#F4FF81]" />,
    date: dateService.getDateByHour(20),
    background: 'rgba(1, 87, 155, 0.5)',
  },
  0: {
    icon: <NightsStayRoundedIcon className="text-[#F9FBE7]" />,
    date: dateService.getDateByHour(0),
    background: 'rgba(13, 71, 161, 0.5)',
  },
};

const getClosestHour = (time: Dayjs): Hour => {
  const options: Hour[] = [0, 8, 12, 17, 20];

  const hours = time.get('hours');
  const minutes = time.get('minutes');
  const totalMinutes = hours * 60 + minutes;

  const optionsInMinutes = options.map((hour) => hour * 60);

  let closestNumber = options[0];
  let minDifference = Math.abs(totalMinutes - optionsInMinutes[0]);

  for (let i = 0; i < optionsInMinutes.length; i++) {
    const difference = Math.abs(totalMinutes - optionsInMinutes[i]);
    if (difference < minDifference) {
      minDifference = difference;
      closestNumber = options[i]; // Store the hour, not the minutes
    }
  }

  return closestNumber;
};

interface HourItemProps {
  date: Dayjs;
  hour: Hour;
  seconds?: boolean;
}

const HourItem = ({ date, hour, seconds }: HourItemProps) => (
  <Typography variant="subtitle1" className="flex items-center gap-2">
    <span>
      {seconds
        ? dateService.formatFullTime(date)
        : dateService.formatTime(date)}
    </span>
    {hourData[hour].icon}
  </Typography>
);

const TimeDisplay = ({ hour }: Props) => {
  const {
    item: { timezone },
  } = useCityContext();

  const timezoneHour = dateService.getDateByHour(hour, timezone);
  const localHour = dateService.getDateByTimezone(
    timezoneHour,
    'Asia/Jerusalem',
  );
  const closestHour = getClosestHour(localHour);

  return (
    <Box
      className="flex items-center flex-col w-fit rounded p-2 mx-auto"
      sx={{
        background: `linear-gradient(to bottom, ${hourData[hour].background}, ${hourData[closestHour].background})`,
      }}
    >
      <HourItem date={timezoneHour} hour={hour} />
      <HeightRoundedIcon />
      <HourItem date={localHour} hour={closestHour} />
    </Box>
  );
};

export const CurrentTimeDisplay = () => {
  const {
    item: { timezone },
  } = useCityContext();
  const translations = useTranslations().city.timeDifference;

  const { data: time = dayjs() } = useQuery({
    queryKey: ['currentTime'],
    queryFn: () => dayjs(),
    refetchInterval: 1000,
  });
  const hour = getClosestHour(time);

  const timezoneTime = dateService.getDateByTimezone(time, timezone);
  const timezoneHour = getClosestHour(timezoneTime);

  return (
    <Tooltip title={translations.current} placement="top">
      <div
        className="flex items-center flex-col w-fit rounded p-2 mx-auto border border-solid"
        style={{
          background: `linear-gradient(to bottom, ${hourData[timezoneHour].background}, ${hourData[hour].background})`,
        }}
      >
        <HourItem date={timezoneTime} hour={timezoneHour} />
        <HeightRoundedIcon />
        <HourItem date={time} hour={hour} />
      </div>
    </Tooltip>
  );
};

export default TimeDisplay;

import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import dateService from '@services/date.service';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import dayjs from 'dayjs';

interface Props {
  timezoneDiff: number;
  timezone: string;
}

const TimeDifferenceDisplay = ({ timezoneDiff, timezone }: Props) => {
  const translations = useTranslations().common;

  const formatted = dateService.getTimeByMinutes(Math.abs(timezoneDiff * 60));

  const label =
    timezoneDiff > 0
      ? `+${formatted}`
      : timezoneDiff < 0
        ? `-${formatted}`
        : translations.none;

  const { data: localTime = dayjs() } = useQuery({
    queryKey: ['currentTime'],
    queryFn: () => dayjs(),
    refetchInterval: 1000,
  });

  const timezoneTime = dateService.getDateByTimezone(localTime, timezone);
  const tooltip =
    !!timezoneDiff &&
    `${dateService.formatTime(timezoneTime)} ⇒ ${dateService.formatTime(localTime)}`;

  return (
    <Tooltip title={tooltip} placement="left">
      <Typography variant="body2">{label}</Typography>
    </Tooltip>
  );
};

export default TimeDifferenceDisplay;

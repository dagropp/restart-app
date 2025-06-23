import Typography from '@common/Typography';
import { alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SparkLineChart } from '@mui/x-charts';
import dateService from '@services/date.service';
import { format } from '@utils/format.utils';
import { number } from '@utils/number.utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  name: string;
  jobs: number[];
}

export const JobsChart = ({ jobs, name }: Props) => {
  const theme = useTheme();

  const trend = useMemo(() => {
    const isBetterThanInitial = jobs.at(-1)! > jobs.at(0)!;
    const isBetterThanPrev = jobs.at(-1)! > jobs.at(-2)!;
    if (isBetterThanInitial && isBetterThanPrev) {
      return theme.palette.success;
    }
    if (
      (isBetterThanInitial && !isBetterThanPrev) ||
      (!isBetterThanInitial && isBetterThanPrev)
    ) {
      return theme.palette.warning;
    }
    return theme.palette.error;
  }, [jobs, theme.palette.error, theme.palette.success, theme.palette.warning]);

  const trendRate = (jobs.at(-1)! / jobs.at(0)! - 1) * 100;
  const trendRateDisplay =
    trendRate >= 0
      ? `+${number.toFixed(trendRate, 2)}%`
      : `${number.toFixed(trendRate, 2)}%`;

  if (!jobs.length) return null;

  const range = `${dateService.formatDate(dayjs().subtract(jobs.length - 1, 'day'))} - ${dateService.formatDate(dayjs())}`;

  return (
    <div
      className="w-full rounded-lg border p-2 flex flex-col items-start"
      style={{
        borderColor: theme.palette.divider,
        backgroundColor: alpha(trend.light, 0.1),
      }}
    >
      <Typography variant="body2">
        <strong>{name}</strong>
      </Typography>
      <Typography variant="caption" className="">
        {format.shortNumber(jobs.at(-1)!)} Jobs Posted
        <span
          className="px-1 py-0.5 rounded scale-90 inline-block ml-1"
          style={{ backgroundColor: trend.light, color: trend.contrastText }}
        >
          {trendRateDisplay}
        </span>
      </Typography>
      <Typography variant="caption">{range}</Typography>
      <SparkLineChart
        data={jobs}
        height={100}
        color={trend.light}
        showTooltip
        showHighlight
        className="mt-2"
        valueFormatter={(value) => `${format.shortNumber(value!)}`}
      />
    </div>
  );
};

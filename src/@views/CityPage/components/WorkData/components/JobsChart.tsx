import SparkLineChart from '@common/SparkLineChart';
import Typography from '@common/Typography';
import { alpha, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dateService from '@services/date.service';
import { interpolateTranslations, useTranslations } from '@translations';
import { format } from '@utils/format.utils';
import { is } from '@utils/is.utils';
import { number } from '@utils/number.utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  name: string;
  jobs?: number[];
}

export const JobsChart = ({ jobs = [], name }: Props) => {
  const theme = useTheme();
  const translations = useTranslations().city.jobData;

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

  const range = `${dateService.formatDate(dayjs().subtract(jobs.length - 1, 'day'))} - ${dateService.formatDate(dayjs())}`;
  const latest = jobs.at(-1);
  const isLoading = is.nullOrUndefined(latest);

  return (
    <div
      className="w-full rounded-lg border p-2 flex flex-col items-start"
      style={{
        borderColor: theme.palette.divider,
        backgroundColor: isLoading
          ? theme.palette.action.hover
          : alpha(trend.light, 0.1),
      }}
    >
      <Typography variant="body2">
        <strong>{name}</strong>
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width="65%" />
      ) : (
        <Typography variant="caption">
          {interpolateTranslations(translations.jobsPosted, {
            jobs: format.shortNumber(jobs.at(-1)!),
          })}
          <span
            className="px-1 py-0.5 rounded scale-90 inline-block ml-1"
            style={{ backgroundColor: trend.light, color: trend.contrastText }}
          >
            {trendRateDisplay}
          </span>
        </Typography>
      )}
      {isLoading ? (
        <Skeleton variant="text" width="60%" />
      ) : (
        <Typography variant="caption">{range}</Typography>
      )}

      <SparkLineChart
        data={jobs}
        height={100}
        color={trend.light}
        showTooltip
        showHighlight
        className="mt-2"
        valueFormatter={(value) => `${format.shortNumber(value!)}`}
        isLoading={isLoading}
      />
    </div>
  );
};

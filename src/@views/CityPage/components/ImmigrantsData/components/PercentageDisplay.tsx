import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { format } from '@utils/format.utils';
import clsx from 'clsx';

import { useCityContext } from '../../../context';

const getProgressProps = (value: number = 100): CircularProgressProps => {
  const color: CircularProgressProps['color'] =
    value === 100
      ? 'inherit'
      : value > 25
        ? 'error'
        : value > 10
          ? 'warning'
          : value > 5
            ? 'info'
            : 'success';
  return {
    variant: 'determinate',
    size: 48,
    className: clsx('absolute inset-0', value === 100 && 'opacity-10'),
    value,
    color,
  };
};

export const PercentageDisplay = () => {
  const translations = useTranslations().city.immigrants;
  const { isRtl } = useTranslationsContext();
  const { item } = useCityContext();
  const {
    population,
    immigrants: { percentage },
  } = item;

  const totalPeople = Math.round(population * (percentage / 100));
  const people = format.shortNumber(totalPeople, 1_000_000);
  const isShortened = totalPeople.toLocaleString() !== people;
  const dir = isRtl ? 'rtl' : 'ltr';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-12 w-12 flex items-center justify-center mx-auto">
        <CircularProgress color="inherit" {...getProgressProps()} />
        <CircularProgress {...getProgressProps(percentage)} />
        <Typography variant="caption" lineHeight="normal">
          {percentage}%
        </Typography>
      </div>
      <Tooltip title={isShortened && totalPeople.toLocaleString()}>
        <Typography variant="caption" dir={dir}>
          {interpolateTranslations(translations.people, { people })}
        </Typography>
      </Tooltip>
    </div>
  );
};

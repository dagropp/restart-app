import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';
import { formatCurrency } from '@utils/format.utils';
import { number } from '@utils/number.utils';
import clsx from 'clsx';
import { ReactNode, useMemo } from 'react';

import { useCityContext, useCostContext } from '../context';
import { getSimulationStateSum } from './simulation-utils';

interface ItemProps {
  label: string;
  value: ReactNode;
  isLast?: boolean;
}

interface SavingsDisplayProps {
  value: number;
}

const Item = ({ label, value, isLast }: ItemProps) => {
  const theme = useTheme();

  return (
    <div
      className={clsx('flex-1 w-[140px]', !isLast && 'border-r pr-2')}
      style={{ borderColor: theme.palette.divider }}
    >
      <Typography variant="caption">
        <strong>{label}</strong>
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </div>
  );
};

const SavingsDisplay = ({ value }: SavingsDisplayProps) => {
  const { currencyConverter, item } = useCityContext();

  return (
    <Tooltip
      placement="bottom"
      title={formatCurrency(value, item.country.currency)}
    >
      <span>{currencyConverter(value)}</span>
    </Tooltip>
  );
};

export const SimulationResults = () => {
  const { positive, positiveState, negative, negativeState } = useCostContext();
  const translations = useTranslations();
  const compTranslations = translations.city.cost.simulation;

  const positiveSum = useMemo(
    () => getSimulationStateSum(positive, positiveState),
    [positive, positiveState],
  );
  const negativeSum = useMemo(
    () => getSimulationStateSum(negative, negativeState),
    [negative, negativeState],
  );
  const colBalance = useMemo(
    () =>
      positiveSum
        ? `${number.toFixed(100 - (negativeSum / positiveSum) * 100)}%`
        : translations.common.notAvailable,
    [negativeSum, positiveSum, translations.common.notAvailable],
  );
  const yearlyBalance = (positiveSum - negativeSum) * 12;

  const incomeCount = useMemo(
    () =>
      !positiveState.partner.hidden && positiveState.partner.value ? 2 : 1,
    [positiveState.partner.hidden, positiveState.partner.value],
  );

  const items: ItemProps[] = [
    {
      label:
        yearlyBalance > 0 ? compTranslations.surplus : compTranslations.deficit,
      value: colBalance,
    },
    {
      label:
        yearlyBalance > 0 ? compTranslations.savings : compTranslations.losses,
      value: <SavingsDisplay value={yearlyBalance} />,
    },
    {
      label: 'Rent / Income Ratio',
      value: number.percentage(negativeState.rent.value, positiveSum, 0),
    },
    { label: compTranslations.incomes, value: incomeCount },
  ];

  return (
    <SectionCard className="w-max mx-auto" contentClassName="!p-4">
      <div className="flex gap-2 items-center justify-center text-center">
        {items.map(({ label, value }, index) => (
          <Item
            key={label}
            label={label}
            value={value}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </SectionCard>
  );
};

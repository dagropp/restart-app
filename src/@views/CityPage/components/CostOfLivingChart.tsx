import './cost-of-living.css';

import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { darken } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart, PieValueType } from '@mui/x-charts';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import { number } from '@utils/number.utils';
import { object } from '@utils/object.utils';
import { useMemo } from 'react';

import { useCityContext, useCostContext } from '../context';

const CostOfLivingChart = () => {
  const { currency, currencies } = useAppContext();
  const { item } = useCityContext();

  const { negative, positive, negativeState, positiveState } = useCostContext();
  const theme = useTheme();

  const currencyConverter = convertCurrency(
    currencies,
    currency,
    item.country.currency,
  );

  const userNetIncome = positiveState.user.hidden
    ? 0
    : positive.user.mapper!(positiveState.user.value) +
      positive.userTax.mapper!(positiveState.userTax.value);

  const userStipend = positiveState.userStipend.hidden
    ? 0
    : positiveState.userStipend.value;

  const partnerStipend = positiveState.partnerStipend.hidden
    ? 0
    : positiveState.partnerStipend.value;

  const partnerNetIncome = useMemo(() => {
    if (
      !positiveState.partner ||
      !positive.partner ||
      positiveState.partner.hidden
    )
      return 0;
    const gross = positive.partner.mapper
      ? positive.partner.mapper(positiveState.partner.value)
      : positiveState.partner.value;
    const tax = !positive.partnerTax
      ? 0
      : positive.partnerTax.mapper
        ? positive.partnerTax.mapper(positiveState.partnerTax.value)
        : positiveState.partnerTax.value;
    return gross + tax;
  }, [
    positive.partner,
    positive.partnerTax,
    positiveState.partner,
    positiveState.partnerTax.value,
  ]);

  const negativeSeries: Omit<PieValueType, 'id'>[] = object
    .entries(negativeState)
    .map(([key, { value, hidden, instances = 1 }], index) => {
      const { mapper, label } = negative[key];
      const mappedValue = hidden
        ? 0
        : mapper
          ? mapper(value * instances)
          : value * instances;
      return {
        value: mappedValue,
        label: `${label} ${currencyConverter(mappedValue)} (${formatCurrency(mappedValue, item.country.currency)})`,
        color: darken(theme.palette.error.light, 0.1 * (index + 1)),
      };
    });

  const remainder =
    userNetIncome +
    partnerNetIncome +
    userStipend +
    partnerStipend -
    number.sum(...negativeSeries.map((item) => item.value));

  const positiveSeries: Omit<PieValueType, 'id'>[] = [
    {
      value: userNetIncome,
      label: `${positive.user.label} ${currencyConverter(userNetIncome)} (${formatCurrency(userNetIncome, item.country.currency)})`,
      color: darken(theme.palette.info.light, 0.1),
    },
    {
      value: partnerNetIncome,
      label:
        positive.partner &&
        `${positive.partner.label} ${currencyConverter(partnerNetIncome)} (${formatCurrency(partnerNetIncome, item.country.currency)})`,
      color: darken(theme.palette.info.light, 0.2),
    },
    {
      value: userStipend,
      label: `${positive.userStipend?.label} ${currencyConverter(userStipend)} (${formatCurrency(userStipend, item.country.currency)})`,
      color: darken(theme.palette.info.light, 0.3),
    },
    {
      value: partnerStipend,
      label: `${positive.partnerStipend?.label} ${currencyConverter(partnerStipend)} (${formatCurrency(partnerStipend, item.country.currency)})`,
      color: darken(theme.palette.info.light, 0.4),
    },
  ];

  const series: Omit<PieValueType, 'id'>[] = [
    ...positiveSeries,
    { value: Math.abs(remainder) },
    ...negativeSeries,
  ];

  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 h-[250px] z-10 flex items-center justify-center text-center">
        <Typography variant="h6">
          <span>
            {formatCurrency(remainder, item.country.currency)}
            <Typography variant="caption"> / M</Typography>
          </span>
          <Typography variant="body2">
            {currencyConverter(remainder)}
          </Typography>
        </Typography>
      </div>
      <PieChart
        className="cost-of-living z-20"
        series={[
          {
            data: series,
            innerRadius: 60,
            valueFormatter: () => null,
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        height={250}
        slotProps={{
          legend: { className: '!hidden' },
          pieArc: { className: '!stroke-transparent' },
        }}
      />
    </div>
  );
};

export default CostOfLivingChart;

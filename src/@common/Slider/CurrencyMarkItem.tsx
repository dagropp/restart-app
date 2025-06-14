import { useAppContext } from '@context/app';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import clsx from 'clsx';

import Typography from '../Typography';
import { type CurrencyMarkItemProps } from './types';

export const CurrencyMarkItem = ({
  value,
  label,
  currency,
}: CurrencyMarkItemProps) => {
  const { currency: ctxCurrency, currencies } = useAppContext();
  const currencyConverter = convertCurrency(currencies, ctxCurrency, currency);

  return (
    <div className={clsx('flex flex-col items-center', label?.toLowerCase())}>
      <Typography variant="body2">
        {currency ? formatCurrency(value, currency) : value}
      </Typography>
      {ctxCurrency !== currency && (
        <Typography variant="caption">{currencyConverter(value)}</Typography>
      )}
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
    </div>
  );
};

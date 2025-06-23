import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { Currency } from '@root/types';
import currencyService from '@services/currency';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import clsx from 'clsx';

interface Props {
  currency: Currency;
  flagHidden?: boolean;
  showConversion?: boolean;
  className?: string;
}

const CurrencyDisplay = ({
  currency,
  flagHidden,
  showConversion,
  className,
}: Props) => {
  const { currencies, currency: ctxCurrency } = useAppContext();
  const converter = convertCurrency(currencies, ctxCurrency, currency);

  const conversionDisplay =
    showConversion &&
    currency !== ctxCurrency &&
    `${formatCurrency(1, currency)} ⇒ ${converter(1, false)}`;

  const { name, symbol, flag, element } = currencyService.map[currency];

  return (
    <Tooltip title={conversionDisplay} placement="left">
      <Typography
        variant="body2"
        className={clsx('flex gap-2 items-center', className)}
      >
        <Typography
          variant="caption"
          color="textSecondary"
          className="flex w-6 h-6 rounded-2xl border border-solid border-gray-300 justify-center items-center"
        >
          <span className="h-full w-full flex items-center justify-center">
            {element ?? symbol}
          </span>
        </Typography>
        <span>{name}</span>
        {!flagHidden && (
          <img
            src={`/assets/flags/${flag}.svg`}
            alt={flag}
            className="h-4 ml-auto"
          />
        )}
      </Typography>
    </Tooltip>
  );
};

export default CurrencyDisplay;

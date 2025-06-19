import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { Currency } from '@services/api';
import currencyService from '@services/currency';
import { useTranslations } from '@translations';
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
  const translations = useTranslations().enum.currency;
  const converter = convertCurrency(currencies, ctxCurrency, currency);

  const conversionDisplay =
    showConversion &&
    currency !== ctxCurrency &&
    `${formatCurrency(1, currency)} ⇒ ${converter(1, false)}`;

  const { symbol, flag, element } = currencyService.map[currency];
  const name = translations[currency];

  return (
    <Tooltip title={conversionDisplay} placement="left">
      <div className={clsx('flex gap-2 items-center', className)}>
        <Typography
          variant="caption"
          color="textSecondary"
          className="flex w-6 h-6 rounded-2xl border border-solid border-gray-300 justify-center items-center"
          dir="ltr"
        >
          <span className="h-full w-full flex items-center justify-center">
            {element ?? symbol}
          </span>
        </Typography>
        <Typography variant="body2">{name}</Typography>
        {!flagHidden && (
          <img
            src={`/assets/flags/${flag}.svg`}
            alt={flag}
            className="h-4 ml-auto"
          />
        )}
      </div>
    </Tooltip>
  );
};

export default CurrencyDisplay;

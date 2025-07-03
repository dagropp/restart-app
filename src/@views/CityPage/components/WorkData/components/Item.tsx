import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import Skeleton from '@mui/material/Skeleton';
import { Currency } from '@root/types';
import InfoTooltip from '@shared/InfoTooltip';
import { useTranslations } from '@translations';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import { useCityContext } from '@views/CityPage/context';
import { ReactNode, useMemo } from 'react';

interface Props {
  label: ReactNode;
  gross: number;
  net: number;
  description?: string;
  currency?: Currency;
}

export const Item = ({ label, gross, net, description, currency }: Props) => {
  const { currencies, currency: ctxCurrency } = useAppContext();
  const { item, currencyConverter: ctxCurrencyConverter } = useCityContext();
  const translations = useTranslations().city.jobData;

  const currencyConverter = useMemo(() => {
    if (!currency) return ctxCurrencyConverter;
    return convertCurrency(currencies, ctxCurrency, currency);
  }, [ctxCurrency, ctxCurrencyConverter, currencies, currency]);

  const sections = [
    { label: translations.gross, value: gross },
    { label: translations.net, value: net / 12 },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="body2" className="flex items-center gap-1">
        {typeof label === 'string' ? <strong>{label}</strong> : label}
        {description && <InfoTooltip title={description} placement="right" />}
      </Typography>
      {sections.map((section) => (
        <div
          className="flex items-center justify-between gap-2"
          key={section.label}
        >
          <Typography variant="body2">{section.label}</Typography>
          {isNaN(section.value) ? (
            <Skeleton variant="text" width="20%" />
          ) : (
            <Tooltip
              title={formatCurrency(
                section.value,
                currency ?? item.country.currency,
              )}
              placement="left"
            >
              <Typography variant="body2">
                {currencyConverter(section.value)}
              </Typography>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

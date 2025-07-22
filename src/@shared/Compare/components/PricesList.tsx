import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { City } from '@root/types.ts';
import apiService from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';
import { costUtils } from '@utils/cost.utils';
import { convertCurrencyToNumber } from '@utils/format.utils.ts';
import { Fragment } from 'react';

import { PriceListItem } from './PriceListItem';

interface Props {
  city?: City;
  other?: City;
}

export const PricesList = ({ city, other }: Props) => {
  const { data: thisCityCost } = apiService.useCost(city);
  const { data: otherCityCost } = apiService.useCost(other);
  const { data: cities } = apiService.useCities();
  const { currencies } = useAppContext();
  const translations = useTranslations();
  const { isRtl } = useTranslationsContext();
  const compTranslations = translations.city.prices;

  const thisCity = cities && city && cities[city];
  const otherCity = cities && other && cities[other];

  if (!thisCity || !otherCity || !thisCityCost || !otherCityCost) return null;

  const cityProps = {
    data: thisCityCost,
    currency: thisCity.country.currency,
    converter: convertCurrencyToNumber(currencies, thisCity.country.currency),
  };
  const otherProps = {
    data: otherCityCost,
    currency: otherCity.country.currency,
    converter: convertCurrencyToNumber(currencies, otherCity.country.currency),
  };

  return (
    <div className="col-span-3">
      <Typography variant="h6" className="text-center py-5">
        {compTranslations.title}
      </Typography>
      <div className="gap-4 grid grid-cols-[repeat(5,max-content)] justify-center items-center">
        <PriceListItem
          city={cityProps}
          other={otherProps}
          field="generalCost"
        />
        {costUtils.groups.map(({ id, fields, Icon }) => (
          <Fragment key={id}>
            <Typography
              variant="body1"
              fontWeight="500"
              className="col-span-5 flex items-center gap-2 justify-center"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <Icon />
              {translations.enum.priceGroup[id]}
            </Typography>
            {fields.map((field) => (
              <PriceListItem
                key={field}
                city={cityProps}
                other={otherProps}
                field={field}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

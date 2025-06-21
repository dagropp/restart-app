import Link from '@common/Link';
import Slider, { CurrencyMarkItem } from '@common/Slider';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import SectionCard from '@shared/SectionCard';
import { interpolateTranslations, useTranslations } from '@translations';
import { convertCurrency } from '@utils/format.utils';
import { ReactNode } from 'react';

import { useCityContext } from '../context';
import { formatSliderHandle } from './shared';

interface Props {
  rent: number;
  setRent: (value: number) => void;
}

interface Mark {
  value: number;
  label?: ReactNode;
}

const getExternalLink = (key: string): string =>
  `https://www.numbeo.com/cost-of-living/in/${key}`;

const CostEditor = ({ rent, setRent }: Props) => {
  const { currency, currencies } = useAppContext();
  const { item, cost } = useCityContext();
  const { group } = useUserContext();
  const translations = useTranslations().city.cost.rent;

  const currencyConverter = convertCurrency(
    currencies,
    currency,
    item.country.currency,
  );

  const marks: Mark[] = [
    {
      value: cost.rentOuter,
      label: (
        <CurrencyMarkItem
          value={cost.rentOuter}
          label={translations.outer}
          currency={item.country.currency}
        />
      ),
    },
    {
      value: cost.rentCentral,
      label: (
        <CurrencyMarkItem
          value={cost.rentCentral}
          label={translations.central}
          currency={item.country.currency}
        />
      ),
    },
  ];

  const apartmentSizeLabel =
    group.bedrooms === 1
      ? translations.bedroomSingle
      : interpolateTranslations(translations.bedrooms, {
          bedrooms: group.bedrooms,
        });

  return (
    <SectionCard
      title={translations.title}
      subtitle={
        <>
          {interpolateTranslations(translations.subtitle, {
            size: apartmentSizeLabel,
          })}
          <Link external href={getExternalLink(item.costOfLivingKey)}>
            Cost of Living
          </Link>
        </>
      }
      className="min-w-[600px]"
    >
      <div className="py-5 px-12">
        <Slider
          value={rent}
          onChange={setRent}
          marks={marks}
          min={cost.rentOuter}
          max={cost.rentCentral}
          step={1}
          valueLabelDisplay="on"
          valueLabelFormat={(value) =>
            formatSliderHandle(value, item.country.currency, currencyConverter)
          }
        />
      </div>
    </SectionCard>
  );
};

export default CostEditor;

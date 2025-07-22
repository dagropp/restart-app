import Accordion from '@common/Accordion';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import { Currency } from '@root/types';
import { CostResponse, DisplayableCostFields } from '@services/api';
import { interpolateTranslations, useTranslations } from '@translations';
import { costUtils, PriceGroup } from '@utils/cost.utils';
import {
  convertCurrency,
  CurrencyConverter,
  formatCurrency,
} from '@utils/format.utils';
import { useMemo, useState } from 'react';

import SectionCard from '../SectionCard';
import { PriceItem } from './PriceItem';

interface Props {
  cost: CostResponse;
  currency: Currency;
}

interface TranslatedFieldData {
  label: string;
  caption?: string;
}

interface CostItemProps {
  field: keyof DisplayableCostFields;
  cost: CostResponse;
  currency: Currency;
  currencyConverter: CurrencyConverter;
}

interface CostGroupProps extends PriceGroup {
  expanded: boolean;
  handleExpand: () => void;
  cost: CostResponse;
  currency: Currency;
  currencyConverter: CurrencyConverter;
}

const CostItem = ({
  field,
  cost,
  currency,
  currencyConverter,
}: CostItemProps) => {
  const { currency: ctxCurrency } = useAppContext();
  const { group } = useUserContext();
  const translations = useTranslations().enum.cost;

  const { rangeKey, mapper = (v) => v, Icon, isFloat } = costUtils.map[field];
  const { label, caption: tCaption } = translations[
    field
  ] as TranslatedFieldData;
  const caption =
    field === 'rentOuter'
      ? interpolateTranslations(tCaption!, { bedrooms: group.bedrooms })
      : tCaption;

  const value = mapper(cost[field]);
  let range = rangeKey && mapper(cost[rangeKey] as number);
  if (value === range) range = undefined;

  let formatted =
    currency !== ctxCurrency ? formatCurrency(value, currency, !isFloat) : '';
  if (range && formatted) {
    formatted = [value, range]
      .toSorted((a, b) => a - b)
      .map((val) => formatCurrency(val, currency, !isFloat))
      .join(' - ');
  }
  let converted = currencyConverter(value, !isFloat);
  if (range) {
    converted = [value, range]
      .toSorted((a, b) => a - b)
      .map((val) => currencyConverter(val, !isFloat))
      .join(' - ');
  }

  return (
    <PriceItem
      Icon={Icon}
      label={label}
      caption={caption}
      formattedValue={formatted}
      convertedValue={converted}
    />
  );
};

export const CostGroup = ({
  fields,
  expanded,
  handleExpand,
  Icon,
  currency,
  currencyConverter,
  cost,
  id,
}: CostGroupProps) => {
  const translations = useTranslations().enum.priceGroup;

  return (
    <Accordion
      expanded={expanded}
      handleExpand={handleExpand}
      title={translations[id]}
      Icon={Icon}
    >
      {fields
        .filter((field) => cost[field])
        .map((field) => (
          <CostItem
            key={field}
            field={field}
            cost={cost}
            currency={currency}
            currencyConverter={currencyConverter}
          />
        ))}
    </Accordion>
  );
};

const Prices = ({ cost, currency }: Props) => {
  const [expanded, setExpanded] = useState<string | null>(
    costUtils.groups[0].id,
  );
  const { currencies, currency: ctxCurrency } = useAppContext();
  const translations = useTranslations().city.prices;

  const currencyConverter = useMemo(
    () => convertCurrency(currencies, ctxCurrency, currency),
    [ctxCurrency, currencies, currency],
  );

  const handleExpand = (group: string) => () =>
    setExpanded((prev) => (prev === group ? null : group));

  return (
    <SectionCard title={translations.title} TitleIcon={PointOfSaleRoundedIcon}>
      <CostItem
        field="generalCost"
        cost={cost}
        currency={currency}
        currencyConverter={currencyConverter}
      />
      {costUtils.groups.map((group) => (
        <CostGroup
          key={group.id}
          expanded={expanded === group.id}
          handleExpand={handleExpand(group.id)}
          cost={cost}
          currency={currency}
          currencyConverter={currencyConverter}
          {...group}
        />
      ))}
    </SectionCard>
  );
};

export default Prices;

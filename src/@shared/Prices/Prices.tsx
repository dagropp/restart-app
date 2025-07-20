import Accordion from '@common/Accordion';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { Currency } from '@root/types';
import { CostResponse } from '@services/api';
import { interpolateTranslations, useTranslations } from '@translations';
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

type DisplayableFields = Omit<
  CostResponse,
  | 'lastUpdate'
  | 'city'
  | 'buyCentral'
  | 'rentCentral'
  | 'directFlight'
  | 'japanCar'
  | 'rentSingleCentral'
  | 'rentSingleOuter'
  | 'generalSingleCost'
>;

interface FieldData {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  rangeKey?: keyof CostResponse;
  mapper?: (value: number) => number;
  isFloat?: boolean;
}

interface TranslatedFieldData {
  label: string;
  caption?: string;
}

interface Group {
  id:
    | 'realEstate'
    | 'eatingOut'
    | 'groceryShopping'
    | 'transportation'
    | 'bills'
    | 'education';
  fields: (keyof DisplayableFields)[];
  Icon: OverridableComponent<SvgIconTypeMap>;
}

interface CostItemProps {
  field: keyof DisplayableFields;
  cost: CostResponse;
  currency: Currency;
  currencyConverter: CurrencyConverter;
}

interface CostGroupProps extends Group {
  expanded: boolean;
  handleExpand: () => void;
  cost: CostResponse;
  currency: Currency;
  currencyConverter: CurrencyConverter;
}

const map: Record<keyof DisplayableFields, FieldData> = {
  generalCost: {},
  // real estate
  rentOuter: { rangeKey: 'rentCentral' },
  buyOuter: { rangeKey: 'buyCentral', mapper: (value) => value * 120 },
  // food
  beer: {},
  mealDate: {},
  mealSingle: {},
  mcDonalds: {},
  coffee: {},
  // groceries
  milk: {},
  bread: {},
  eggs: {},
  cheese: {},
  chicken: {},
  beef: {},
  apples: {},
  tomatoes: {},
  wine: {},
  beerBottle: {},
  // transportation
  ticketSingle: {},
  ticketMonth: {},
  germanCar: { rangeKey: 'japanCar' },
  gasoline: { isFloat: true },
  stopsFlight: { rangeKey: 'directFlight' },
  // bills
  bills: {},
  internet: {},
  mobile: {},
  // education
  preSchool: {},
  privateSchool: {},
};

const groups: Group[] = [
  {
    id: 'realEstate',
    Icon: MapsHomeWorkRoundedIcon,
    fields: ['rentOuter', 'buyOuter'],
  },
  {
    id: 'eatingOut',
    Icon: DinnerDiningRoundedIcon,
    fields: ['mealSingle', 'mealDate', 'mcDonalds', 'coffee', 'beer'],
  },
  {
    id: 'groceryShopping',
    Icon: ShoppingCartRoundedIcon,
    fields: [
      'milk',
      'bread',
      'eggs',
      'cheese',
      'chicken',
      'beef',
      'apples',
      'tomatoes',
      'wine',
      'beerBottle',
    ],
  },
  {
    id: 'transportation',
    Icon: DirectionsCarFilledRoundedIcon,
    fields: [
      'ticketSingle',
      'ticketMonth',
      'germanCar',
      'gasoline',
      'stopsFlight',
    ],
  },
  {
    id: 'bills',
    Icon: ReceiptRoundedIcon,
    fields: ['bills', 'internet', 'mobile'],
  },
  {
    id: 'education',
    Icon: SchoolRoundedIcon,
    fields: ['preSchool', 'privateSchool'],
  },
];

const CostItem = ({
  field,
  cost,
  currency,
  currencyConverter,
}: CostItemProps) => {
  const { currency: ctxCurrency } = useAppContext();
  const { group } = useUserContext();
  const translations = useTranslations().enum.cost;

  const { rangeKey, mapper = (v) => v, Icon, isFloat } = map[field];
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
  const [expanded, setExpanded] = useState<string | null>(groups[0].id);
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
      {groups.map((group) => (
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

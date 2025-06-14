import Accordion from '@common/Accordion';
import { useAppContext } from '@context/app';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { CostResponse, Currency } from '@services/api';
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
  label: string;
  rangeKey?: keyof CostResponse;
  caption?: string;
  mapper?: (value: number) => number;
  isFloat?: boolean;
}

interface Group {
  title: string;
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
  generalCost: {
    Icon: CreditCardRoundedIcon,
    label: 'General Cost',
    caption: '/ Month',
  },
  // real estate
  rentOuter: { label: 'Rent', caption: '/ Month', rangeKey: 'rentCentral' },
  buyOuter: {
    label: 'Buy',
    rangeKey: 'buyCentral',
    caption: '/ 120sqm.',
    mapper: (value) => value * 120,
  },
  // food
  beer: { label: 'Draught Beer', caption: '/ 0.5L' },
  mealDate: { label: 'Dinner Out', caption: '/ Couple' },
  mealSingle: { label: 'Lunch Out', caption: '/ Person' },
  mcDonalds: { label: 'McDonalds Combo Meal', caption: '/ Person' },
  coffee: { label: 'Cappuccino', caption: '/ Cup' },
  // groceries
  milk: { label: 'Milk', caption: '/ 1L' },
  bread: { label: 'Bread', caption: '/ Loaf' },
  eggs: { label: 'Eggs', caption: '/ Dozen' },
  cheese: { label: 'Cheese', caption: '/ 1Kg' },
  chicken: { label: 'Chicken Fillets', caption: '/ 1Kg' },
  beef: { label: 'Ground Beef', caption: '/ 1Kg' },
  apples: { label: 'Apples', caption: '/ 1Kg' },
  tomatoes: { label: 'Tomatoes', caption: '/ 1Kg' },
  wine: { label: 'Wine', caption: '/ 0.75L' },
  beerBottle: { label: 'Beer Bottle', caption: '/ 0.5L' },
  // transportation
  ticketSingle: { label: 'Public Transport', caption: '/ Single Ticket' },
  ticketMonth: { label: 'Public Transport', caption: '/ Monthly Pass' },
  germanCar: { label: 'Family Car', rangeKey: 'japanCar' },
  gasoline: { label: 'Gasoline', caption: '/ 1L', isFloat: true },
  stopsFlight: {
    label: 'Flight to TLV',
    caption: '/ Person',
    rangeKey: 'directFlight',
  },
  // bills
  bills: { label: 'Utility Bills', caption: '/ Month' },
  internet: { label: 'Internet', caption: '/ Month' },
  mobile: { label: 'Cellphone', caption: '/ Month' },
  // education
  preSchool: { label: 'Preschool', caption: '/ Month' },
  privateSchool: { label: 'Private School', caption: '/ Month' },
};

const groups: Group[] = [
  {
    Icon: MapsHomeWorkRoundedIcon,
    title: 'Real Estate',
    fields: ['rentOuter', 'buyOuter'],
  },
  {
    Icon: DinnerDiningRoundedIcon,
    title: 'Dining',
    fields: ['mealSingle', 'mealDate', 'mcDonalds', 'coffee', 'beer'],
  },
  {
    Icon: ShoppingCartRoundedIcon,
    title: 'Grocery Shopping',
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
    Icon: DirectionsCarFilledRoundedIcon,
    title: 'Transportation',
    fields: [
      'ticketSingle',
      'ticketMonth',
      'germanCar',
      'gasoline',
      'stopsFlight',
    ],
  },
  {
    Icon: ReceiptRoundedIcon,
    title: 'Bills',
    fields: ['bills', 'internet', 'mobile'],
  },
  {
    Icon: SchoolRoundedIcon,
    title: 'Education',
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

  const {
    rangeKey,
    mapper = (v) => v,
    Icon,
    label,
    caption,
    isFloat,
  } = map[field];

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
  title,
  fields,
  expanded,
  handleExpand,
  Icon,
  currency,
  currencyConverter,
  cost,
}: CostGroupProps) => {
  return (
    <Accordion
      expanded={expanded}
      handleExpand={handleExpand}
      title={title}
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
  const [expanded, setExpanded] = useState<string | null>(groups[0].title);
  const { currencies, currency: ctxCurrency } = useAppContext();

  const currencyConverter = useMemo(
    () => convertCurrency(currencies, ctxCurrency, currency),
    [ctxCurrency, currencies, currency],
  );

  const handleExpand = (group: string) => () =>
    setExpanded((prev) => (prev === group ? null : group));

  return (
    <SectionCard title="Prices" TitleIcon={PointOfSaleRoundedIcon}>
      <CostItem
        field="generalCost"
        cost={cost}
        currency={currency}
        currencyConverter={currencyConverter}
      />
      {groups.map((group) => (
        <CostGroup
          key={group.title}
          expanded={expanded === group.title}
          handleExpand={handleExpand(group.title)}
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

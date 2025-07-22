import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { type OverridableComponent } from '@mui/material/OverridableComponent';
import { type SvgIconTypeMap } from '@mui/material/SvgIcon';
import { CostResponse, DisplayableCostFields } from '@services/api';

export interface PriceGroup {
  id:
    | 'realEstate'
    | 'eatingOut'
    | 'groceryShopping'
    | 'transportation'
    | 'bills'
    | 'education';
  fields: (keyof DisplayableCostFields)[];
  Icon: OverridableComponent<SvgIconTypeMap>;
}

export interface PriceFieldData {
  Icon?: OverridableComponent<SvgIconTypeMap>;
  rangeKey?: keyof CostResponse;
  mapper?: (value: number) => number;
  isFloat?: boolean;
}

const map: Record<keyof DisplayableCostFields, PriceFieldData> = {
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

const groups: PriceGroup[] = [
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

export const costUtils = { map, groups };

import Select, { type SelectProps } from '@common/Select';
import { Currency } from '@root/types';
import currencyService from '@services/currency';

import CurrencyDisplay from './CurrencyDisplay';

export interface Props
  extends Omit<SelectProps<Currency>, 'options' | 'children'> {
  flagHidden?: boolean;
}

const CurrencySelect = ({ flagHidden, ...props }: Props) => {
  const options = currencyService.list.map((currency) => ({
    value: currency,
    label: <CurrencyDisplay currency={currency} flagHidden={flagHidden} />,
  }));

  return <Select options={options} {...props} />;
};

export default CurrencySelect;

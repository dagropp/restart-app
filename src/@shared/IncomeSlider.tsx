import Slider, { CurrencyMarkItem } from '@common/Slider';
import { useAppContext } from '@context/app';
import { Currency } from '@root/types';
import { type IncomeItem, type IncomeResponse } from '@services/api';
import { convertCurrency, formatCurrency } from '@utils/format.utils';
import { ReactNode } from 'react';

interface Mark {
  value: number;
  label?: ReactNode;
}

interface Props {
  gross: number;
  setGross: (value: number) => void;
  income: IncomeResponse;
  currency: Currency;
  disabled?: boolean;
}

const getMark = (
  item: IncomeItem,
  label: string,
  currency: Currency,
): Mark => ({
  value: item.gross,
  label: (
    <CurrencyMarkItem
      key={label}
      value={item.gross}
      label={label}
      currency={currency}
    />
  ),
});

const labels = ['Low', 'Median', 'High', 'Extreme'];

const IncomeSlider = ({
  gross,
  setGross,
  income,
  currency,
  disabled,
}: Props) => {
  const { currency: ctxCurrency, currencies } = useAppContext();
  const currencyConverter = convertCurrency(currencies, ctxCurrency, currency);

  const marks: Mark[] = income.marks
    .map((mark, index) => getMark(mark, labels[index], currency))
    .concat(income.increments.map(({ gross }) => ({ value: gross })))
    .toSorted((a, b) => a.value - b.value);

  return (
    <Slider
      value={gross}
      onChange={setGross}
      marks={marks}
      min={income.marks.at(0)?.gross}
      max={income.marks.at(-1)?.gross}
      step={null}
      valueLabelDisplay="on"
      disabled={disabled}
      valueLabelFormat={(value: number) => (
        <div className="flex flex-col">
          <span>{formatCurrency(value, currency)}</span>
          {currency !== ctxCurrency && (
            <span className="text-xs">{currencyConverter(value)}</span>
          )}
        </div>
      )}
    />
  );
};

export default IncomeSlider;

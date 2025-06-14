import { type SliderProps as MuiSliderProps } from '@mui/material/Slider';
import { type Currency } from '@services/api';

export interface SliderProps extends Omit<MuiSliderProps, 'onChange'> {
  onChange: (value: number) => void;
}

export interface CurrencyMarkItemProps {
  value: number;
  label: string;
  currency: Currency;
}

import { type SwitchProps as MuiSwitchProps } from '@mui/material/Switch';

export interface SwitchProps extends Omit<MuiSwitchProps, 'onChange'> {
  onChange?: (value: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
}

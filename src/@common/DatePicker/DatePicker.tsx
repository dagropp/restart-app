import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';

import classes from './styles.module.css';
import { DatePickerProps } from './types';

const DatePicker = ({ isRtl, slotProps = {}, ...props }: DatePickerProps) => (
  <MuiDatePicker
    slotProps={{
      textField: {
        className: clsx(isRtl && classes.rtl),
        ...(slotProps.textField ?? {}),
      },
      ...slotProps,
    }}
    {...props}
  />
);

export default DatePicker;

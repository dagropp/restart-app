import FormControl from '@mui/material/FormControl';
import InputLabel, { type InputLabelProps } from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { type SelectChangeEvent } from '@mui/material/Select';
import clsx from 'clsx';
import { useCallback, useId } from 'react';

import { type SelectProps } from './types';

const Select = <T = unknown,>({
  options,
  onChange,
  placeholder,
  className,
  classes = {},
  size,
  ...props
}: SelectProps<T>) => {
  const labelId = useId();

  const handleChange = useCallback(
    (event: SelectChangeEvent<T>) => onChange?.(event.target.value as T),
    [onChange],
  );

  return (
    <FormControl fullWidth className="h-max">
      <InputLabel
        id={labelId}
        size={size as InputLabelProps['size']}
        className={clsx(size === 'small' && 'mt-0.5')}
      >
        {placeholder}
        {props.required && ' *'}
      </InputLabel>
      <MuiSelect
        labelId={labelId}
        onChange={handleChange}
        className={clsx(
          size === 'small' ? 'min-h-[42px]' : 'min-h-[53px]',
          className,
        )}
        classes={{ ...classes, select: clsx('!py-3', classes?.select) }}
        size={size}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={String(option.value)}
            value={option.value as string}
            disabled={option.disabled}
          >
            {option.label ?? String(option.value)}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

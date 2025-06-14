import MuiSwitch from '@mui/material/Switch';
import { type ChangeEvent, useCallback } from 'react';

import Typography from '../Typography';
import { type SwitchProps } from './types';

const Switch = ({ onChange, leftLabel, rightLabel, ...props }: SwitchProps) => {
  const handleChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => onChange?.(checked),
    [onChange],
  );

  if (!leftLabel && !rightLabel) {
    return <MuiSwitch onChange={handleChange} {...props} />;
  }

  return (
    <div className="flex items-center gap-2">
      {leftLabel && <Typography>{leftLabel}</Typography>}
      <MuiSwitch onChange={handleChange} {...props} />
      {rightLabel && <Typography>{rightLabel}</Typography>}
    </div>
  );
};

export default Switch;

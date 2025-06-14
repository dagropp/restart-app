import MuiSlider from '@mui/material/Slider';
import { useCallback } from 'react';

import { type SliderProps } from './types';

const Slider = ({ onChange, ...props }: SliderProps) => {
  const handleChange = useCallback(
    (_: Event, value: number | number[]) =>
      onChange(Array.isArray(value) ? value[0] : value),
    [onChange],
  );

  return <MuiSlider onChange={handleChange} {...props} />;
};

export default Slider;

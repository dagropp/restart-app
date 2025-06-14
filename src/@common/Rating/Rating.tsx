import MuiRating from '@mui/material/Rating';

import Tooltip from '../Tooltip';
import { type RatingProps } from './types';

const Rating = ({
  value,
  precision = 0.5,
  tooltip,
  base = 5,
  ...props
}: RatingProps) => {
  const division = base / 5;
  const relativeValue = value && value / division;
  const fixedValue = relativeValue && relativeValue < 0.5 ? 0.5 : relativeValue;

  const element = (
    <MuiRating value={fixedValue} precision={precision} {...props} />
  );

  if (!tooltip) return element;

  const popover = tooltip === true ? relativeValue?.toFixed(1) : tooltip;

  return (
    <Tooltip title={popover}>
      <span>{element}</span>
    </Tooltip>
  );
};

export default Rating;

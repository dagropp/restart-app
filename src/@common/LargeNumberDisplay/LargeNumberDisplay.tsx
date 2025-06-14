import { format } from '@utils/format.utils';

import Tooltip from '../Tooltip';
import { LargeNumberDisplayProps } from './types';

const LargeNumberDisplay = ({
  value,
  showTooltip,
}: LargeNumberDisplayProps) => {
  const formatted = <span>{format.shortNumber(value, 10_000, 2)}</span>;

  return showTooltip ? (
    <Tooltip title={Math.round(value).toLocaleString()} placement="left">
      {formatted}
    </Tooltip>
  ) : (
    formatted
  );
};

export default LargeNumberDisplay;

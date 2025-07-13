import Typography from '@common/Typography';
import Box from '@mui/material/Box';
import { CompareItem } from '@services/api';
import clsx from 'clsx';

import { statusMap } from '../constants';

interface Props extends CompareItem {
  rtl: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  isIsolated?: boolean;
}
export const Item = ({
  status,
  label,
  rtl,
  isFirst,
  isLast,
  isIsolated,
}: Props) => {
  const { Icon, bgcolor } = statusMap[status];

  return (
    <Box
      className={clsx(
        'p-2 flex gap-3 items-center flex-1',
        rtl && 'justify-end',
        (isFirst || isIsolated) && 'rounded-t-lg',
        (isLast || isIsolated) && 'rounded-b-lg',
        isIsolated && 'mt-5',
      )}
      sx={{ bgcolor }}
    >
      <Typography
        variant="body2"
        className={clsx('text-balance', rtl && 'text-right')}
        lineHeight="normal"
      >
        {label}
      </Typography>
      <Icon fontSize="small" className={clsx(!rtl && '-order-1')} />
    </Box>
  );
};

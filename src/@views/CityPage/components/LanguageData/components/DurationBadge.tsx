import Typography from '@common/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';

interface Props {
  duration?: [number] | [number, number];
  label: string;
  isLast?: boolean;
}

export const DurationBadge = ({ duration, label, isLast }: Props) => {
  const theme = useTheme();

  return (
    <div
      className={clsx('flex-1 px-2 max-w-[120px]', !isLast && 'border-r pr-2')}
      style={{ borderColor: theme.palette.divider }}
    >
      <Typography variant="h6">
        {duration ? (
          duration.join(' - ')
        ) : (
          <Skeleton variant="rounded" className="mb-1 w-5/6 mx-auto" />
        )}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
    </div>
  );
};

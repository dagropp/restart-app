import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';

interface Props {
  duration: [number] | [number, number];
  label: string;
  isLast?: boolean;
}

export const DurationBadge = ({ duration, label, isLast }: Props) => {
  const theme = useTheme();

  return (
    <div
      className={clsx('flex-1 px-2', !isLast && 'border-r pr-2')}
      style={{
        borderColor: theme.palette.divider,
        maxWidth: duration.length === 2 ? 120 : 80,
      }}
    >
      <Typography variant="h6">{duration.join(' - ')}</Typography>
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
    </div>
  );
};

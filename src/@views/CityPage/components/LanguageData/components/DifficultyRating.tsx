import Typography from '@common/Typography';
import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import { type LanguageCategory } from '@services/api';
import clsx from 'clsx';

interface Props {
  category?: LanguageCategory;
}

const categoryLabelMap: Record<LanguageCategory, string> = {
  0: '',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  4.5: '4+',
  5: '5',
};

const map: Record<LanguageCategory, CircularProgressProps['color']> = {
  0: 'success',
  1: 'success',
  2: 'success',
  3: 'info',
  4: 'warning',
  4.5: 'warning',
  5: 'error',
};

const getProgressProps = (
  category?: LanguageCategory,
): CircularProgressProps => {
  const color: CircularProgressProps['color'] = category
    ? map[category]
    : 'inherit';

  return {
    variant: 'determinate',
    size: 48,
    className: clsx('absolute inset-0', !category && 'opacity-10'),
    value: category ? (category / 5) * 100 : 100,
    color,
  };
};

export const DifficultyRating = ({ category }: Props) => {
  return (
    <div className="relative h-12 w-12 flex items-center justify-center mx-auto">
      <CircularProgress thickness={5} {...getProgressProps()} />
      <CircularProgress thickness={5} {...getProgressProps(category)} />
      <Typography variant="body1" lineHeight="normal" fontWeight={500}>
        {category ? (
          categoryLabelMap[category]
        ) : (
          <Skeleton variant="rounded" width={20} />
        )}
      </Typography>
    </div>
  );
};

import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';

import { SkeletonItemProps } from '../types';

export const ChecklistSkeletonItem = ({ isDone }: SkeletonItemProps) => (
  <div className="flex gap-2 items-center">
    <Checkbox checked={isDone} size="small" disabled />
    <Skeleton variant="text" width="calc(100% - 80px)" />
  </div>
);

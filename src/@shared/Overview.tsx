import Masonry from '@mui/lab/Masonry';
import Skeleton from '@mui/material/Skeleton';
import { style } from '@utils/style.utils';
import { type ReactNode } from 'react';

import SectionCard from './SectionCard';

interface Props {
  loading?: boolean;
  gridKey?: string;
  children?: NonNullable<ReactNode>;
}

const OverviewSkeleton = () => {
  const heights = [300, 250, 200, 150, 200, 250, 180, 80];

  return (
    <Masonry
      columns={style.MASONRY_COLUMN_COUNT}
      spacing={2}
      sequential={false}
    >
      {heights.map((height, index) => (
        <SectionCard className="!p-0" contentClassName="!p-0" key={index}>
          <Skeleton variant="rectangular" height={height} />
        </SectionCard>
      ))}
    </Masonry>
  );
};

const Overview = ({ loading, gridKey, children }: Props) =>
  loading || !children ? (
    <div className="px-5">
      <OverviewSkeleton />
    </div>
  ) : (
    <Masonry
      columns={style.MASONRY_COLUMN_COUNT}
      spacing={2}
      sequential={false}
      key={gridKey}
      className="pl-5"
    >
      {children}
    </Masonry>
  );

export default Overview;

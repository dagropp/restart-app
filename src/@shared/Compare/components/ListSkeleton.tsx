import { Skeleton } from '@mui/material';

export const ListSkeleton = () => {
  const list = (
    <Skeleton height={412.5} className="rounded-lg" variant="rectangular" />
  );
  const total = (
    <Skeleton height={31.5} className="rounded-lg mt-5" variant="rectangular" />
  );

  return (
    <>
      {list}
      <div />
      {list}

      {total}
      <div />
      {total}
    </>
  );
};

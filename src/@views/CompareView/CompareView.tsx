import { lazy } from 'react';

const Compare = lazy(() => import('@shared/Compare'));

const CompareView = () => {
  return (
    <div className="py-5">
      <Compare storageKey="compareView" />
    </div>
  );
};

export default CompareView;

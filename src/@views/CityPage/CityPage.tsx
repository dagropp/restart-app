import { CityTabKey } from '@root/types';
import { lazy, Suspense } from 'react';

import { GeneralTabs } from './components';

interface Props {
  tab: CityTabKey;
}

const CityPageComponent = lazy(() => import('./CityPageComponent'));

const CityPage = ({ tab }: Props) => {
  return (
    <Suspense fallback={<GeneralTabs tab={tab} loading />}>
      <CityPageComponent tab={tab} />
    </Suspense>
  );
};

export default CityPage;

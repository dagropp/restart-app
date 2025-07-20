import { CountryTabKey } from '@root/types';
import { lazy, Suspense } from 'react';

import { GeneralTabs } from './components';

interface Props {
  tab: CountryTabKey;
}

const CountryPageComponent = lazy(() => import('./CountryPageComponent'));

const CountryPage = ({ tab }: Props) => {
  return (
    <Suspense fallback={<GeneralTabs tab={tab} loading />}>
      <CountryPageComponent tab={tab} />
    </Suspense>
  );
};

export default CountryPage;

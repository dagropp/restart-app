import titleService from '@services/title';
import { lazy, useLayoutEffect } from 'react';

const Cities = lazy(() => import('@views/Cities'));

const App = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Cities');
  }, []);

  return <Cities />;
};

export default App;

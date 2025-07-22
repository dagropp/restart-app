import titleService from '@services/title';
import Cities from '@views/Cities';
import { useLayoutEffect } from 'react';

const App = () => {
  useLayoutEffect(() => {
    titleService.setTitle('Cities');
  }, []);

  return <Cities />;
};

export default App;

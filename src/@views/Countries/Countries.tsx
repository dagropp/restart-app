import { lazy } from 'react';

const CountriesComponent = lazy(() => import('./CountriesComponent'));

const Countries = () => <CountriesComponent />;

export default Countries;

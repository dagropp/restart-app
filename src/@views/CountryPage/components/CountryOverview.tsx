import GoogleMapCard from '@shared/GoogleMapCard';
import Overview from '@shared/Overview';
import Prices from '@shared/Prices';
import WikiData from '@shared/WikiData';

import { useCountryContext } from '../context';
import { CityList } from './CityList';
import { CountryGeneralData } from './CountryGeneralData';

interface Props {
  loading: boolean;
}

const OverviewWithData = () => {
  const { item, cost } = useCountryContext();

  return (
    <Overview>
      <WikiData wikipediaKey={item.wikipediaKey} />
      <CityList />
      <CountryGeneralData />
      <Prices cost={cost} currency={item.currency} />
      <GoogleMapCard params={{ place: item.name }} />
    </Overview>
  );
};

export const CountryOverview = ({ loading }: Props) =>
  loading ? <Overview loading /> : <OverviewWithData />;

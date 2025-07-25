import FunFacts from '@shared/FunFacts';
import GoogleMapCard from '@shared/GoogleMapCard';
import Landmarks from '@shared/Landmarks';
import Overview from '@shared/Overview';
import Prices from '@shared/Prices';
import WikiData from '@shared/WikiData';

import { useCountryContext } from '../context';
import { CityList } from './CityList';
import { CountryGeneralData } from './CountryGeneralData';
import { ReligionChart } from './ReligionChart';

interface Props {
  loading: boolean;
}

const OverviewWithData = () => {
  const { item, cost } = useCountryContext();

  return (
    <Overview>
      <WikiData wikipediaKey={item.wikipediaKey} />
      <CityList />
      <ReligionChart />
      <CountryGeneralData />
      <Prices cost={cost} currency={item.currency} />
      <GoogleMapCard params={{ place: item.name }} />
      {item.landmarks && <Landmarks items={item.landmarks} />}
      {item.funFacts && <FunFacts items={item.funFacts} />}
    </Overview>
  );
};

export const CountryOverview = ({ loading }: Props) =>
  loading ? <Overview loading /> : <OverviewWithData />;

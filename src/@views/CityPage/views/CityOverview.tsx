import FunFacts from '@shared/FunFacts';
import GoogleMapCard from '@shared/GoogleMapCard';
import Landmarks from '@shared/Landmarks';
import Overview from '@shared/Overview';
import Prices from '@shared/Prices';
import SectionCard from '@shared/SectionCard';

import {
  CityWikiData,
  GeneralData,
  Plan,
  ScoreCard,
  TimeDisplayList,
  WeatherDisplay,
  WorkData,
} from '../components';
import FlightData from '../components/FlightData';
import Insights from '../components/Insights';
import { useCityContext } from '../context';

interface Props {
  loading: boolean;
}

const OverviewWithData = () => {
  const { item, cost } = useCityContext();

  return (
    <Overview gridKey={item.id}>
      <CityWikiData />
      <Insights />
      <GeneralData />
      <ScoreCard />
      <GoogleMapCard query={`${item.name},${item.country.name}`} zoom={10} />
      {item.landmarks && <Landmarks items={item.landmarks} />}
      {item.funFacts && <FunFacts items={item.funFacts} />}
      <WorkData />
      <Prices currency={item.country.currency} cost={cost} />
      <Plan />
      <FlightData />
      <SectionCard title="Time Difference">
        <TimeDisplayList />
      </SectionCard>
      <SectionCard title="Weather">
        <WeatherDisplay />
      </SectionCard>
    </Overview>
  );
};

const CityOverview = ({ loading }: Props) =>
  loading ? <Overview loading /> : <OverviewWithData />;

export default CityOverview;

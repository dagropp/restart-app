import FunFacts from '@shared/FunFacts';
import Landmarks from '@shared/Landmarks';
import Overview from '@shared/Overview';
import Prices from '@shared/Prices';

import {
  CityGoogleMapCard,
  CityLinks,
  CityWikiData,
  GeneralData,
  Plan,
  QualityRank,
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
      <CityGoogleMapCard />
      {item.landmarks && <Landmarks items={item.landmarks} />}
      {item.funFacts && <FunFacts items={item.funFacts} />}
      <WorkData />
      <Prices currency={item.country.currency} cost={cost} />
      <Plan />
      <FlightData />
      <QualityRank />
      <TimeDisplayList />
      <WeatherDisplay />
      <CityLinks />
    </Overview>
  );
};

const CityOverview = ({ loading }: Props) =>
  loading ? <Overview loading /> : <OverviewWithData />;

export default CityOverview;

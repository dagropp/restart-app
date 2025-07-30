import apiService from '@services/api';
import FunFacts from '@shared/FunFacts';
import Landmarks from '@shared/Landmarks';
import Overview from '@shared/Overview';
import Prices from '@shared/Prices';

import {
  CityGoogleMapCard,
  CityLinks,
  CityWikiData,
  GeneralData,
  ImmigrantsData,
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
  const flags = apiService.flags.use();

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
      {flags.immigration && <ImmigrantsData />}
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

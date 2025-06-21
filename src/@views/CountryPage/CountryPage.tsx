import apiService, { Country } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { object } from '@utils/object.utils';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { CountryTabKey } from '../../types';
import { GeneralTabs, Tabs } from './components';
import { CountryContextWrapper } from './context';

interface Props {
  tab: CountryTabKey;
}
const CountryPage = ({ tab }: Props) => {
  const id = useParams().id as Country;
  const { data } = apiService.countries.useList();

  const item = useMemo(() => data && data[id], [data, id]);

  const { data: cost } = useQuery({
    queryKey: ['getCost', item?.id],
    queryFn: () => apiService.getCost(item!.id),
    enabled: !!item?.id,
  });

  const { data: cities } = apiService.useCities();
  const { data: scores } = apiService.score.use();

  const countryCities = useMemo(
    () =>
      cities &&
      object
        .values(cities)
        .filter(({ country }) => country.id === id)
        .toSorted((a, b) => scores[b.id].average - scores[a.id].average),
    [cities, id, scores],
  );

  const isLoading = !item || !cost || !countryCities;

  return isLoading ? (
    <GeneralTabs tab={tab} item={item} loading={isLoading} />
  ) : (
    <CountryContextWrapper value={{ item, cost, cities: countryCities }}>
      <Tabs tab={tab} />
    </CountryContextWrapper>
  );
};

export default CountryPage;

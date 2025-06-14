import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import apiService, { City } from '@services/api';
import titleService from '@services/title';
import { useQuery } from '@tanstack/react-query';
import { convertCurrency } from '@utils/format.utils';
import { useLayoutEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { CityTabKey } from '../../types';
import Tabs, { GeneralTabs } from './components/Tabs';
import { CityContextWrapper, CostContextWrapper } from './context';

interface Props {
  tab: CityTabKey;
}

const CityPage = ({ tab }: Props) => {
  const { data } = apiService.useCities();
  const id = useParams().id as City;
  const { user, group } = useUserContext();
  const { currencies, currency: ctxCurrency } = useAppContext();

  const item = useMemo(() => data && data[id], [data, id]);

  useLayoutEffect(() => {
    titleService.setTitle(item?.name ?? '');
  }, [item?.name]);

  const { data: income } = useQuery({
    queryKey: ['getIncome', item?.id, user.income],
    queryFn: () => apiService.income.get(item!.id, user.income),
    enabled: !!item?.id,
  });

  const { data: partnerIncome } = useQuery({
    queryKey: ['getGroupIncome', item?.id, group.partner],
    queryFn: () =>
      apiService.income.get(item!.id, group.partner!.income, group.partner?.id),
    enabled: !!group.partner && !!item,
  });

  const { data: cost } = useQuery({
    queryKey: ['getCost', item?.id],
    queryFn: () => apiService.getCost(item!.id),
    enabled: !!item?.id,
  });

  const { data: flights } = useQuery({
    queryKey: ['getFlights', item?.id],
    queryFn: () => apiService.flights.get(item!.id),
    enabled: !!item?.id,
  });

  const { data: community } = useQuery({
    queryKey: ['getCommunity', item?.id],
    queryFn: () => apiService.community.get(item!.id),
    enabled: !!item?.id,
  });

  const currencyConverter = useMemo(
    () =>
      convertCurrency(
        currencies,
        ctxCurrency,
        item?.country?.currency ?? ctxCurrency,
      ),
    [ctxCurrency, currencies, item?.country?.currency],
  );

  const isLoading = !item || !income || !cost || !user;

  return isLoading ? (
    <GeneralTabs tab={tab} item={item} loading={isLoading} />
  ) : (
    <CityContextWrapper
      value={{
        item,
        cost,
        income,
        flights,
        community,
        partnerIncome,
        currencyConverter,
      }}
    >
      <CostContextWrapper>
        <Tabs tab={tab} />
      </CostContextWrapper>
    </CityContextWrapper>
  );
};

export default CityPage;

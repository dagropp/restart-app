import Typography from '@common/Typography';
import useFilters from '@hooks/useFilters';
import apiService from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { useTranslations, useTranslationsContext } from '@translations';

import CitySelect, { CitySelectProps } from '../CitySelect';
import { List, ListSkeleton, PricesList } from './components';
import { CompareProps } from './types';

const Compare = ({
  storageKey,
  loading,
  defaultCity,
  defaultOther,
  readOnly,
}: CompareProps) => {
  const { filters, update } = useFilters(storageKey, {
    city: defaultCity,
    other: defaultOther,
  });
  const translations = useTranslations().compare;
  const { language } = useTranslationsContext();

  const { data = [], isLoading } = useQuery({
    queryKey: ['getCompare', filters.city, filters.other, loading, language],
    queryFn: () =>
      apiService.compare.get(filters.city!, filters.other!, language),
    enabled: !loading && !!filters.city && !!filters.other,
  });

  const getProps = (key: 'city' | 'other'): CitySelectProps => {
    const value = filters[key];
    const otherKey = key === 'city' ? 'other' : 'city';
    const label = value ? translations.city : translations.selectCity;

    return {
      value: value ?? '',
      onChange: (newValue) => update({ [key]: newValue }),
      size: 'small',
      className: 'mb-5',
      classes: { select: '!flex' },
      exclude: filters[otherKey] && new Set([filters[otherKey]]),
      label,
      placeholder: label,
    };
  };

  return (
    <div className="h-full grid grid-cols-[1fr_max-content_1fr] px-5 gap-x-5">
      <CitySelect {...getProps('city')} disabled={readOnly} />
      <Typography className="flex items-center h-full pb-5" variant="subtitle2">
        {translations.vs}
      </Typography>
      <CitySelect {...getProps('other')} />
      {loading || isLoading ? <ListSkeleton /> : <List data={data} />}
      <PricesList city={filters.city} other={filters.other} />
    </div>
  );
};

export default Compare;

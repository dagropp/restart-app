import Select, { SelectOption, type SelectProps } from '@common/Select';
import { City } from '@root/types';
import apiService from '@services/api';
import { object } from '@utils/object.utils';
import { useMemo } from 'react';

import { CityDisplay } from './CityDisplay';

export interface CitySelectProps
  extends Omit<
    SelectProps<City>,
    'options' | 'multiple' | 'renderValue' | 'children'
  > {
  exclude?: Set<City>;
}

const CitySelect = ({ exclude = new Set(), ...props }: CitySelectProps) => {
  const { data: cities } = apiService.useCities();

  const options: SelectOption<City>[] = useMemo(
    () =>
      cities
        ? object
            .values(cities)
            .filter(({ id }) => !exclude?.has(id))
            .toSorted((a, b) => a.name.localeCompare(b.name))
            .map((city) => ({
              label: <CityDisplay name={city.name} country={city.country.id} />,
              value: city.id,
            }))
        : [],
    [cities, exclude],
  );

  return <Select options={options} {...props} />;
};

export default CitySelect;

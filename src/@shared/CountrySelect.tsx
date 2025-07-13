import Select, { SelectOption, type SelectProps } from '@common/Select';
import Tooltip from '@common/Tooltip';
import useIsOverflow from '@hooks/useIsOverflow';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import { Country } from '@root/types';
import apiService from '@services/api';
import { object } from '@utils/object.utils';
import { useMemo } from 'react';

import CountryDisplay from './CountryDisplay';

interface Props
  extends Omit<SelectProps<Country[]>, 'options' | 'multiple' | 'renderValue'> {
  defaultCountry?: Country;
}

interface CountryListProps {
  items: Country[];
  defaultCountry?: Country;
}

const getSortFn =
  (selected: Set<string>, defaultCountry?: Country) =>
  (a: Country, b: Country) => {
    if (defaultCountry) {
      if (a === defaultCountry) return -1;
      if (b === defaultCountry) return 1;
    }
    const aSelected = selected.has(a);
    const bSelected = selected.has(b);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  };

const sortByDefault = (defaultCountry?: Country) => (a: string, b: string) => {
  if (defaultCountry) {
    if (a === defaultCountry) return -1;
    if (b === defaultCountry) return 1;
  }

  return 0;
};

const CountryList = ({ items, defaultCountry }: CountryListProps) => {
  const theme = useTheme();

  return items.toSorted(sortByDefault(defaultCountry)).map((item) => (
    <div
      key={item}
      className="border border-solid p-2 rounded min-w-max"
      style={{ borderColor: theme.palette.divider }}
    >
      <CountryDisplay country={item} />
    </div>
  ));
};

const CountrySelect = ({ defaultCountry, value, ...props }: Props) => {
  const { data: countries } = apiService.countries.use();
  const { ref, isOverflow } = useIsOverflow<HTMLDivElement>('x');

  const options: SelectOption<Country>[] = useMemo(() => {
    if (!countries) return [];

    const ids = object
      .keys(countries)
      .toSorted((a, b) => countries[a].name.localeCompare(countries[b].name));
    const selectedSet = new Set(value);
    const sortFn = getSortFn(selectedSet);
    return ids.toSorted(sortFn).map((country) => ({
      label: (
        <>
          <Checkbox checked={selectedSet.has(country)} />
          <CountryDisplay key={country} country={country} />
        </>
      ),
      value: country,
    }));
  }, [countries, value]);

  if (!countries) return null;

  return (
    <Select
      options={options}
      multiple
      value={value}
      {...props}
      renderValue={(items) => {
        return (
          <Tooltip
            title={
              isOverflow && (
                <div className="flex gap-2 items-center flex-wrap p-2 max-w-[400px]">
                  <CountryList items={items} defaultCountry={defaultCountry} />
                </div>
              )
            }
          >
            <div
              className="flex gap-2 items-center overflow-hidden"
              ref={ref}
              key={items.join(',')}
            >
              <CountryList items={items} defaultCountry={defaultCountry} />
            </div>
          </Tooltip>
        );
      }}
    />
  );
};

export default CountrySelect;

import Select from '@common/Select';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import { City, Country } from '@root/types';
import apiService from '@services/api';
import { CityDisplay } from '@shared/CityDisplay';
import CountryDisplay from '@shared/CountryDisplay';
import { useTranslations } from '@translations';
import { object } from '@utils/object.utils';

import { GroupInputName } from '../../types';

interface Props {
  defaultValue?: City | Country;
}

export const DestinationInput = ({ defaultValue }: Props) => {
  const translations = useTranslations();

  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.use();

  const cityList = cities ? object.values(cities).map(({ id }) => id) : [];
  const countryList = countries ? object.keys(countries) : [];

  return (
    <Select<City | Country>
      name={GroupInputName.Destination}
      defaultValue={defaultValue}
      label={translations.settings.form.destination}
      placeholder={translations.settings.form.destination}
    >
      <ListSubheader>{translations.menu.primary.cities}</ListSubheader>
      {cityList.map((id) => (
        <MenuItem key={id} value={id}>
          <CityDisplay id={id} />
        </MenuItem>
      ))}
      <ListSubheader>{translations.menu.primary.countries}</ListSubheader>
      {countryList.map((id) => (
        <MenuItem key={id} value={id}>
          <CountryDisplay country={id} />
        </MenuItem>
      ))}
    </Select>
  );
};

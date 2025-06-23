import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, Theme } from '@mui/material/styles';
import { City } from '@root/types';
import apiService, { CityData } from '@services/api';
import { object } from '@utils/object.utils';

import { CityDisplay } from './CityDisplay';

interface Props {
  anchorEl: Element | null;
  onClose: () => void;
  value: City;
  onChange: (value: City) => void;
  exclude?: City;
}

interface ItemProps {
  city: CityData;
  value: City;
  onMenuClick: (city: City) => () => void;
}

const selectedBg = (theme: Theme) =>
  alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity);

const Item = ({ city, value, onMenuClick }: ItemProps) => (
  <MenuItem
    key={city.id}
    onClick={onMenuClick(city.id)}
    sx={value === city.id ? { bgcolor: selectedBg } : {}}
  >
    <CityDisplay name={city.name} country={city.country.id} />
  </MenuItem>
);

const isSatelliteCity = (cities: Record<City, CityData>, city: City) =>
  !!cities[city].satelliteCity;

const isMetroCity = (
  cities: Record<City, CityData>,
  excludedCity: City,
  city: City,
) => city === cities[excludedCity].satelliteCity;

const CityMenu = ({ exclude, anchorEl, onClose, value, onChange }: Props) => {
  const { data: cities } = apiService.useCities();

  const onMenuClick = (update: City) => () => {
    onChange(update);
    onClose();
  };

  const excludedCity = exclude && cities?.[exclude];

  const countryCities =
    cities &&
    excludedCity &&
    object
      .values(cities)
      .filter(
        ({ id, country }) =>
          !isSatelliteCity(cities, id) &&
          !isMetroCity(cities, excludedCity.id, id) &&
          id !== excludedCity.id &&
          country.id === excludedCity.country.id,
      );

  const otherCities = excludedCity
    ? object
        .values(cities)
        .filter(
          ({ id, country }) =>
            !isSatelliteCity(cities, id) &&
            !isMetroCity(cities, excludedCity.id, id) &&
            country.id !== excludedCity.country.id,
        )
    : cities && object.values(cities);

  return (
    <Menu
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 48, horizontal: 'left' }}
      transformOrigin={{ vertical: 'center', horizontal: 'left' }}
      onClose={onClose}
      aria-hidden={!anchorEl}
    >
      {countryCities?.map((item) => (
        <Item
          key={item.id}
          city={item}
          value={value}
          onMenuClick={onMenuClick}
        />
      ))}
      <Divider />
      {otherCities?.map((item) => (
        <Item
          key={item.id}
          city={item}
          value={value}
          onMenuClick={onMenuClick}
        />
      ))}
    </Menu>
  );
};

export default CityMenu;

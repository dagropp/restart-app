import Link from '@common/Link';
import Typography from '@common/Typography';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import apiService, { City, IncomeItem, IncomeType } from '@services/api';
import CityMenu from '@shared/CityMenu.tsx';
import InfoTooltip from '@shared/InfoTooltip.tsx';
import { useQuery } from '@tanstack/react-query';
import { useCityContext } from '@views/CityPage/context';
import { type MouseEvent, useMemo, useState } from 'react';

import { Item } from './Item';

interface Props {
  value: City;
  onChange: (value: City) => void;
  marks: IncomeItem[];
}

export const OtherCityItem = ({ value, onChange, marks }: Props) => {
  const { user } = useUserContext();
  const { item, cost } = useCityContext();
  const { currencies } = useAppContext();
  const { data: cities } = apiService.useCities();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAdjustedCOL, setIsAdjustedCOL] = useState(true);

  const { data: otherCost } = useQuery({
    queryKey: ['getOtherCityCost', value],
    queryFn: () => apiService.getCost(value),
  });

  const converter = useMemo(() => {
    if (!cities) return 1;
    const cityCurrency = currencies[item.country.currency];
    const otherCurrency = currencies[cities[value].country.currency];
    if (cityCurrency === otherCurrency) return 1;
    return cityCurrency / otherCurrency;
  }, [cities, currencies, item.country.currency, value]);

  const costOfLivingFactor = useMemo(() => {
    if (!otherCost || !isAdjustedCOL) return 1;
    const cityTotalCost = cost.generalCost + cost.rentOuter;
    const otherTotalCost = otherCost.generalCost + otherCost.rentOuter;

    return cityTotalCost / (converter * otherTotalCost);
  }, [converter, cost.generalCost, cost.rentOuter, isAdjustedCOL, otherCost]);

  const openMenu = (event: MouseEvent<HTMLAnchorElement>) =>
    setAnchorEl(event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const menu = (
    <span className="flex flex-col">
      <strong>
        Compared with{' '}
        <Link
          onClick={openMenu}
          className="cursor-pointer inline-flex items-center"
        >
          {cities?.[value].name}
          <KeyboardArrowDownRoundedIcon fontSize="small" />
        </Link>
      </strong>
      <span>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={isAdjustedCOL}
              onChange={(_, checked) => setIsAdjustedCOL(checked)}
            />
          }
          label={
            <span className="flex items-center gap-1">
              <Typography variant="caption">Cost of Living Adjusted</Typography>
              <InfoTooltip
                title={`Adjustment for cost of living differences between ${item.name} and ${cities?.[value].name}`}
              />
            </span>
          }
          className="flex items-center"
        />
      </span>

      <CityMenu
        anchorEl={anchorEl}
        onClose={closeMenu}
        value={value}
        onChange={onChange}
        exclude={item.id}
      />
    </span>
  );

  if (user.income === IncomeType.None || !user.incomeMark || !cities)
    return null;

  const { gross, net } = marks[user.incomeMark] ?? {};

  return (
    <Item
      label={menu}
      gross={gross * costOfLivingFactor}
      net={net * costOfLivingFactor}
      currency={cities[value].country.currency}
    />
  );
};

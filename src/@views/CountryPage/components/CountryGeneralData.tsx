import LargeNumberDisplay from '@common/LargeNumberDisplay';
import Link from '@common/Link';
import Typography from '@common/Typography';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { City } from '@root/types';
import apiService from '@services/api';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import GeneralDataCard, { GeneralItemProps } from '@shared/GeneralDataCard';
import LanguageDisplay from '@shared/LanguageDisplay';
import TimeDifferenceDisplay from '@shared/TimeDifferenceDisplay';
import { useMemo } from 'react';

import { useCountryContext } from '../context';

const CapitalDisplay = () => {
  const { item } = useCountryContext();
  const { data: cities } = apiService.useCities();

  const label =
    !item.capital || !cities ? (
      'None'
    ) : !(item.capital in cities) ? (
      item.capital
    ) : (
      <Link href={`/city/${item.capital}`}>
        {cities[item.capital as City].name}
      </Link>
    );

  return <Typography variant="body2">{label}</Typography>;
};

export const CountryGeneralData = () => {
  const { item, cities } = useCountryContext();

  const timeData = useMemo(() => {
    if (
      cities.length &&
      cities.every((city) => city.timezoneDiff === cities[0].timezoneDiff)
    ) {
      return {
        timezoneDiff: cities[0].timezoneDiff,
        timezone: cities[0].timezone,
      };
    }
    return null;
  }, [cities]);

  const items: GeneralItemProps[] = [
    {
      label: 'Capital',
      display: <CapitalDisplay />,
      Icon: AccountBalanceRoundedIcon,
    },
    {
      label: 'Population',
      display: (
        <Typography variant="body2">
          <LargeNumberDisplay value={item.population} showTooltip />
        </Typography>
      ),
      Icon: GroupsRoundedIcon,
    },
    {
      label: 'Language',
      display: (
        <LanguageDisplay
          languages={item.language}
          englishSpeakersPercentage={item.englishSpeakersPercentage}
          captionAsTooltip
          englishLabelOnly
        />
      ),
      Icon: TranslateRoundedIcon,
    },
    {
      label: 'Currency',
      display: (
        <CurrencyDisplay currency={item.currency} flagHidden showConversion />
      ),
      Icon: PaymentsRoundedIcon,
    },
    {
      label: 'Time Difference',
      display: timeData && (
        <TimeDifferenceDisplay
          timezoneDiff={timeData.timezoneDiff}
          timezone={timeData.timezone}
        />
      ),
      Icon: AccessTimeFilledRoundedIcon,
      hidden: !timeData,
    },
    {
      label: 'Highest Elevation',
      display: (
        <Typography variant="body2">
          {item.highestElevation.toLocaleString()}m
        </Typography>
      ),
      Icon: TrendingUpRoundedIcon,
    },
    {
      label: 'Lowest Elevation',
      display: (
        <Typography variant="body2">
          {item.lowestElevation.toLocaleString()}m
        </Typography>
      ),
      Icon: TrendingDownRoundedIcon,
    },
  ];

  return <GeneralDataCard items={items} />;
};

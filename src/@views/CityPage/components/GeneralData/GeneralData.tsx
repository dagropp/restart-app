import Link from '@common/Link';
import Typography from '@common/Typography';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';
import FilterHdrRoundedIcon from '@mui/icons-material/FilterHdrRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { EuUnionStatus } from '@services/api';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import GeneralDataCard, {
  type GeneralItemProps,
} from '@shared/GeneralDataCard';
import LanguageDisplay from '@shared/LanguageDisplay';
import TimeDifferenceDisplay from '@shared/TimeDifferenceDisplay';
import { format } from '@utils/format.utils';

import { useCityContext } from '../../context';
import { CityPopulation, SatelliteCard } from './components';

export const GeneralData = () => {
  const { item } = useCityContext();

  const items: GeneralItemProps[] = [
    {
      label: 'Country',
      display: (
        <Typography variant="body2">
          <Link href={`/countries/${item.country.id}`}>
            {item.country.name}
          </Link>
        </Typography>
      ),
      Icon: PublicRoundedIcon,
    },
    {
      label: 'Population',
      display: <CityPopulation />,
      Icon: GroupsRoundedIcon,
    },
    {
      label: 'Density',
      display: (
        <Typography variant="body2">
          {format.shortNumber(item.density, 10_000, 2)}{' '}
          <Typography variant="caption">
            / km<sup>2</sup>
          </Typography>
        </Typography>
      ),
      Icon: ApartmentRoundedIcon,
    },
    {
      label: 'Is Capital City',
      display: (
        <Typography variant="body2">
          {item.country.capital === item.id ? 'Yes' : 'No'}
        </Typography>
      ),
      Icon: AccountBalanceRoundedIcon,
    },
    {
      label: 'Is European Union',
      display: (
        <Typography variant="body2">
          {item.country.isEu === EuUnionStatus.Yes ? 'Yes' : 'No'}
        </Typography>
      ),
      Icon: EuroRoundedIcon,
    },
    {
      label: 'Language',
      display: (
        <LanguageDisplay
          languages={[item.language]}
          englishSpeakersPercentage={item.country.englishSpeakersPercentage}
          captionAsTooltip
          englishLabelOnly
        />
      ),
      Icon: TranslateRoundedIcon,
    },
    {
      label: 'Currency',
      display: (
        <CurrencyDisplay
          currency={item.country.currency}
          flagHidden
          showConversion
        />
      ),
      Icon: PaymentsRoundedIcon,
    },
    {
      label: 'Time Difference',
      display: (
        <TimeDifferenceDisplay
          timezoneDiff={item.timezoneDiff}
          timezone={item.timezone}
        />
      ),
      Icon: AccessTimeFilledRoundedIcon,
    },
    {
      label: 'Elevation',
      display: <Typography variant="body2">{item.elevation}m</Typography>,
      Icon: FilterHdrRoundedIcon,
    },
  ];

  return (
    <GeneralDataCard items={items}>
      <SatelliteCard />
    </GeneralDataCard>
  );
};

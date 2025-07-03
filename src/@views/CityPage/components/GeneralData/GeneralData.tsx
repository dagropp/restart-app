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
import RadarIcon from '@mui/icons-material/Radar';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import { EuUnionStatus } from '@root/types';
import CurrencyDisplay from '@shared/CurrencyDisplay';
import GeneralDataCard, {
  type GeneralItemProps,
} from '@shared/GeneralDataCard';
import LanguageDisplay from '@shared/LanguageDisplay';
import TimeDifferenceDisplay from '@shared/TimeDifferenceDisplay';
import { useTranslations } from '@translations';
import { format } from '@utils/format.utils';

import { useCityContext } from '../../context';
import {
  CityPopulation,
  SatelliteCard,
  SatelliteCitiesList,
} from './components';

export const GeneralData = () => {
  const { item } = useCityContext();
  const translations = useTranslations();

  const items: GeneralItemProps[] = [
    {
      label: translations.table.cells.country,
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
      label: translations.generalSection.population,
      display: <CityPopulation />,
      Icon: GroupsRoundedIcon,
    },
    {
      label: translations.generalSection.density,
      display: (
        <Typography variant="body2">
          {format.shortNumber(item.density, 10_000, 2)}{' '}
          <Typography variant="caption">
            {translations.generalSection.perKm}
            <sup>2</sup>
          </Typography>
        </Typography>
      ),
      Icon: ApartmentRoundedIcon,
    },
    {
      label: translations.generalSection.isCapital,
      display: (
        <Typography variant="body2">
          {item.country.capital === item.id
            ? translations.common.yes
            : translations.common.no}
        </Typography>
      ),
      Icon: AccountBalanceRoundedIcon,
    },
    {
      label: 'Satellite Cities',
      display: <SatelliteCitiesList />,
      Icon: RadarIcon,
      hidden: !item.satelliteChildren?.length,
    },
    {
      label: translations.table.cells.isEu,
      display: (
        <Typography variant="body2">
          {item.country.isEu === EuUnionStatus.Yes
            ? translations.common.yes
            : translations.common.no}
        </Typography>
      ),
      Icon: EuroRoundedIcon,
    },
    {
      label: translations.table.cells.language,
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
      label: translations.table.cells.currency,
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
      label: translations.city.timeDifference.title,
      display: (
        <TimeDifferenceDisplay
          timezoneDiff={item.timezoneDiff}
          timezone={item.timezone}
        />
      ),
      Icon: AccessTimeFilledRoundedIcon,
    },
    {
      label: translations.generalSection.elevation,
      display: (
        <Typography variant="body2">
          {item.elevation}
          {translations.generalSection.metersAbbrev}
        </Typography>
      ),
      Icon: FilterHdrRoundedIcon,
    },
  ];

  return (
    <GeneralDataCard items={items}>
      <SatelliteCard />
    </GeneralDataCard>
  );
};

import Tooltip from '@common/Tooltip';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import CommuteIcon from '@mui/icons-material/Commute';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import ThunderstormRoundedIcon from '@mui/icons-material/ThunderstormRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconOwnProps, SvgIconTypeMap } from '@mui/material/SvgIcon';
import { InsightKey } from '@services/api';
import { useTranslations } from '@translations';

interface InsightData {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
}

interface Props extends SvgIconOwnProps {
  insightKey: InsightKey;
}

const InsightsIcon = ({ insightKey, ...props }: Props) => {
  const translations = useTranslations().compare.breakdown;

  const map: Record<InsightKey, InsightData> = {
    colIndexMultiple: {
      Icon: PointOfSaleRoundedIcon,
      label: translations.colIndexCouple,
    },
    colIndexSingle: {
      Icon: BusinessCenterRoundedIcon,
      label: translations.colIndexSingle,
    },
    community: { Icon: Diversity3RoundedIcon, label: translations.community },
    electricity: {
      Icon: ElectricBoltRoundedIcon,
      label: translations.electricity,
    },
    flightDuration: {
      Icon: FlightTakeoffRoundedIcon,
      label: translations.flightDuration,
    },
    flightPrice: {
      Icon: AirplaneTicketRoundedIcon,
      label: translations.flightPrice,
    },
    language: { Icon: TranslateRoundedIcon, label: translations.language },
    quality: {
      Icon: VolunteerActivismRoundedIcon,
      label: translations.qolRank,
    },
    rainfall: { Icon: ThunderstormRoundedIcon, label: translations.rainfall },
    sunlight: { Icon: WbSunnyRoundedIcon, label: translations.sunlight },
    visa: { Icon: ApprovalRoundedIcon, label: translations.visa },
    weather: { Icon: ThermostatRoundedIcon, label: translations.weather },
    timezone: {
      Icon: AccessTimeFilledRoundedIcon,
      label: translations.timezone,
    },
    commute: { Icon: CommuteIcon, label: translations.commute },
  };

  const { Icon, label } = map[insightKey];

  return (
    <Tooltip title={label}>
      <Icon {...props} />
    </Tooltip>
  );
};

export default InsightsIcon;

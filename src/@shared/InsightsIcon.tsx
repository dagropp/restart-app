import Tooltip from '@common/Tooltip';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import ApprovalRoundedIcon from '@mui/icons-material/ApprovalRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
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

interface InsightData {
  Icon: OverridableComponent<SvgIconTypeMap>;
  label: string;
}

const map: Record<InsightKey, InsightData> = {
  colIndexMultiple: {
    Icon: PointOfSaleRoundedIcon,
    label: 'Cost of Living Index - Two Providers',
  },
  colIndexSingle: {
    Icon: BusinessCenterRoundedIcon,
    label: 'Cost of Living Index - Single Provider',
  },
  community: { Icon: Diversity3RoundedIcon, label: 'Facebook Community' },
  electricity: {
    Icon: ElectricBoltRoundedIcon,
    label: 'Electricity Compatability',
  },
  flightDuration: { Icon: FlightTakeoffRoundedIcon, label: 'Flight Duration' },
  flightPrice: { Icon: AirplaneTicketRoundedIcon, label: 'Flight Price' },
  language: { Icon: TranslateRoundedIcon, label: 'Language' },
  quality: {
    Icon: VolunteerActivismRoundedIcon,
    label: 'Quality of Life Rank',
  },
  rainfall: { Icon: ThunderstormRoundedIcon, label: 'Rainfall Amount' },
  sunlight: { Icon: WbSunnyRoundedIcon, label: 'Sunlight Duration' },
  visa: { Icon: ApprovalRoundedIcon, label: 'Visa Requirements' },
  weather: { Icon: ThermostatRoundedIcon, label: 'Weather' },
  timezone: { Icon: AccessTimeFilledRoundedIcon, label: 'Timezone Difference' },
};

interface Props extends SvgIconOwnProps {
  insightKey: InsightKey;
}

const InsightsIcon = ({ insightKey, ...props }: Props) => {
  const { Icon, label } = map[insightKey];

  return (
    <Tooltip title={label}>
      <Icon {...props} />
    </Tooltip>
  );
};

export default InsightsIcon;

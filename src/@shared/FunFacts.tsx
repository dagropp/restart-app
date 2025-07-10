import Typography from '@common/Typography';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import ChurchRoundedIcon from '@mui/icons-material/ChurchRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import DirectionsBoatRoundedIcon from '@mui/icons-material/DirectionsBoatRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import EmojiNatureRoundedIcon from '@mui/icons-material/EmojiNatureRounded';
import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import PedalBikeRoundedIcon from '@mui/icons-material/PedalBikeRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';
import SportsBaseballRoundedIcon from '@mui/icons-material/SportsBaseballRounded';
import StackedLineChartRoundedIcon from '@mui/icons-material/StackedLineChartRounded';
import TerrainRoundedIcon from '@mui/icons-material/TerrainRounded';
import TheaterComedyRoundedIcon from '@mui/icons-material/TheaterComedyRounded';
import TollRoundedIcon from '@mui/icons-material/TollRounded';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import WineBarRoundedIcon from '@mui/icons-material/WineBarRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { FunFactItem, FunFactType } from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';

import SectionCard from './SectionCard';

const iconMap: Record<FunFactType, OverridableComponent<SvgIconTypeMap>> = {
  animals: PetsRoundedIcon,
  architecture: LocationCityRoundedIcon,
  art: ColorLensRoundedIcon,
  beer: SportsBarRoundedIcon,
  bicycle: PedalBikeRoundedIcon,
  cars: DirectionsCarFilledRoundedIcon,
  culture: TheaterComedyRoundedIcon,
  education: SchoolRoundedIcon,
  flight: FlightRoundedIcon,
  food: RestaurantRoundedIcon,
  geography: MapRoundedIcon,
  history: AccountBalanceRoundedIcon,
  industry: FactoryRoundedIcon,
  nazi: StackedLineChartRoundedIcon,
  language: TranslateRoundedIcon,
  light: LightbulbRoundedIcon,
  literature: MenuBookRoundedIcon,
  money: TollRoundedIcon,
  mountain: TerrainRoundedIcon,
  music: MusicNoteRoundedIcon,
  nature: EmojiNatureRoundedIcon,
  people: Diversity3RoundedIcon,
  rank: MilitaryTechRoundedIcon,
  religion: ChurchRoundedIcon,
  science: BiotechRoundedIcon,
  ship: DirectionsBoatRoundedIcon,
  sport: SportsBaseballRoundedIcon,
  tech: ComputerRoundedIcon,
  transportation: TrainRoundedIcon,
  water: WaterRoundedIcon,
  weather: CloudRoundedIcon,
  wine: WineBarRoundedIcon,
};

interface Props {
  items: FunFactItem[];
}

const Item = ({ label, type }: FunFactItem) => {
  const Icon = iconMap[type] ?? AutoAwesomeRoundedIcon;
  const { isRtl } = useTranslationsContext();

  return (
    <li key={label} className="list-none flex items-center gap-4">
      <Icon fontSize="small" />
      <Typography variant="body2" dir={isRtl ? 'rtl' : 'ltr'}>
        {label}
      </Typography>
    </li>
  );
};

const FunFacts = ({ items }: Props) => {
  const translations = useTranslations().city.funFacts;

  return (
    <SectionCard title={translations.title} TitleIcon={HistoryEduRoundedIcon}>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <Item key={item.label} {...item} />
        ))}
      </ul>
    </SectionCard>
  );
};

export default FunFacts;

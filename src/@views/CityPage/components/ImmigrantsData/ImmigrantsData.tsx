import MosqueRoundedIcon from '@mui/icons-material/MosqueRounded';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import {
  NeighborhoodDisplay,
  OriginDisplay,
  PercentageDisplay,
} from './components';

export const ImmigrantsData = () => {
  const translations = useTranslations().city.immigrants;

  return (
    <SectionCard
      title={translations.title}
      TitleIcon={MosqueRoundedIcon}
      contentClassName="flex flex-col gap-2"
    >
      <PercentageDisplay />
      <OriginDisplay />
      <NeighborhoodDisplay />
    </SectionCard>
  );
};

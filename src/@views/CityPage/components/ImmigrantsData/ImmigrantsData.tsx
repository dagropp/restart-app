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
      subtitle={translations.percentage}
      TitleIcon={MosqueRoundedIcon}
      contentClassName="flex flex-col gap-4"
    >
      <PercentageDisplay />
      <OriginDisplay />
      <NeighborhoodDisplay />
    </SectionCard>
  );
};

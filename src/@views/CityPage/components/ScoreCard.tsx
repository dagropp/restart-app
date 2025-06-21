import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import ScoreDisplay from '@shared/ScoreDisplay';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import { useCityContext } from '../context';

export const ScoreCard = () => {
  const { item } = useCityContext();
  const translations = useTranslations().city.score;

  return (
    <SectionCard title={translations.title} TitleIcon={StarHalfRoundedIcon}>
      <ScoreDisplay city={item.id} />
    </SectionCard>
  );
};

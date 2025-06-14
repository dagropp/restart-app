import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import ScoreDisplay from '@shared/ScoreDisplay';
import SectionCard from '@shared/SectionCard';

import { useCityContext } from '../context';

export const ScoreCard = () => {
  const { item } = useCityContext();

  return (
    <SectionCard title="Score" TitleIcon={StarHalfRoundedIcon}>
      <ScoreDisplay city={item.id} />
    </SectionCard>
  );
};

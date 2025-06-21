import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import TimeDisplay, { CurrentTimeDisplay } from './TimeDisplay';

export const TimeDisplayList = () => {
  const translations = useTranslations().city.timeDifference;

  return (
    <SectionCard
      title={translations.title}
      TitleIcon={AccessTimeFilledRoundedIcon}
    >
      <div className="w-fit mx-auto grid grid-cols-[repeat(3,_auto)] gap-2">
        <CurrentTimeDisplay />
        <TimeDisplay hour={8} />
        <TimeDisplay hour={12} />
        <TimeDisplay hour={17} />
        <TimeDisplay hour={20} />
        <TimeDisplay hour={0} />
      </div>
    </SectionCard>
  );
};

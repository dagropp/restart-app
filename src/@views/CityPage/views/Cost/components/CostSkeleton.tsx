import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import { BreakdownGridSkeleton } from '../../../components';
import { getCardBg } from '../utils';

export const CostSkeleton = () => {
  const theme = useTheme();
  const translations = useTranslations().city.cost.simulation;

  return (
    <SectionCard style={{ background: getCardBg(theme) }}>
      <div className="flex justify-stretch">
        <BreakdownGridSkeleton title={translations.expenses} />
        <div className="flex-1 relative justify-center items-center flex">
          <Skeleton variant="circular" width={250} height={250} />
        </div>
        <div className="flex flex-col gap-5 flex-1">
          <BreakdownGridSkeleton title={translations.income} />
        </div>
      </div>
    </SectionCard>
  );
};

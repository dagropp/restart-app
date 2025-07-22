import Typography from '@common/Typography';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import { useTranslations } from '@translations';
import { style } from '@utils/style.utils';
import { Suspense } from 'react';

import { CostSkeleton, CostWithData } from './components';

interface Props {
  loading: boolean;
}

const Cost = ({ loading }: Props) => {
  const translations = useTranslations().city.cost.simulation;

  return (
    <div className="flex gap-4 items-start flex-col px-5">
      {style.isLargerThanPhone ? (
        loading ? (
          <CostSkeleton />
        ) : (
          <Suspense fallback={<CostSkeleton />}>
            <CostWithData />
          </Suspense>
        )
      ) : (
        <div className="flex flex-col gap-2 w-full items-center justify-center text-center h-[calc(100vh-230px)]">
          <Typography variant="h6">{translations.errorTitle}</Typography>
          <SentimentVeryDissatisfiedRoundedIcon
            fontSize="large"
            className="mt-5 mb-5"
          />
          <Typography variant="caption" className="text-balance">
            {translations.errorSubtitle}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Cost;

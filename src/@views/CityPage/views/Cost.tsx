import Typography from '@common/Typography';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import { alpha, Skeleton, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';
import { style } from '@utils/style.utils';

import { SimulationResults } from '../components';
import BreakdownGrid, {
  BreakdownGridSkeleton,
} from '../components/BreakdownGrid';
import CostOfLivingChart from '../components/CostOfLivingChart';
import { useCostContext } from '../context';

interface Props {
  loading: boolean;
}

const getCardBg = (theme: Theme) =>
  `linear-gradient(to right, ${alpha(theme.palette.error.light, 0.3)}, ${alpha(theme.palette.info.light, 0.3)})`;

const CostSkeleton = () => {
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

const CostWithData = () => {
  const theme = useTheme();
  const translations = useTranslations().city.cost.simulation;

  const {
    positiveState,
    negativeState,
    updateNegativeState,
    updatePositiveState,
    positive,
    negative,
  } = useCostContext();

  return (
    <>
      <SectionCard style={{ background: getCardBg(theme) }}>
        <div className="flex justify-stretch">
          <BreakdownGrid
            title={translations.expenses}
            rows={negative}
            state={negativeState}
            updateState={updateNegativeState}
          />
          <CostOfLivingChart />
          <div className="flex flex-col gap-5 flex-1">
            <BreakdownGrid
              title={translations.income}
              rows={positive}
              state={positiveState}
              updateState={updatePositiveState}
            />
          </div>
        </div>
      </SectionCard>
      <SimulationResults />
    </>
  );
};

const Cost = ({ loading }: Props) => {
  const translations = useTranslations().city.cost.simulation;

  return (
    <div className="flex gap-4 items-start flex-col px-5">
      {style.isLargerThanPhone ? (
        loading ? (
          <CostSkeleton />
        ) : (
          <CostWithData />
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

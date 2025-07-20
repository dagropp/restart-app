import { useTheme } from '@mui/material/styles';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';

import { SavedSimulations, SimulationResults } from '../../../components';
import BreakdownGrid from '../../../components/BreakdownGrid';
import CostOfLivingChart from '../../../components/CostOfLivingChart';
import { useCostContext } from '../../../context';
import { getCardBg } from '../utils';

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
      <SavedSimulations />
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

export default CostWithData;

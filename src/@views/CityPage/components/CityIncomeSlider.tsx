import Link from '@common/Link';
import { useUserContext } from '@context/user';
import apiService, { IncomeResponse } from '@services/api';
import IncomeSlider from '@shared/IncomeSlider';
import SectionCard from '@shared/SectionCard';
import { incomeUtils } from '@utils/income.utils';

import { useCityContext } from '../context';

interface Props {
  gross: number;
  setGross: (value: number) => void;
  income?: IncomeResponse;
}

const CityIncomeSlider = ({ gross, setGross, income }: Props) => {
  const { income: ctxIncome, item } = useCityContext();
  const { data: cities } = apiService.useCities();
  const { user } = useUserContext();
  const selectedIncome = income ?? ctxIncome;

  const incomeData = incomeUtils.typeMap[selectedIncome.type];
  const remoteCity = user.incomeRemote && cities && cities[user.incomeRemote];

  const subtitle = (
    <>
      As a {incomeData.title}
      {remoteCity &&
        `, Working remotely in ${remoteCity.name}, ${remoteCity.country.name}`}
      {incomeData.subtitle && ` (${incomeData.subtitle})`}
      {incomeData.getLink && incomeData.linkTitle && (
        <>
          , based on{' '}
          <Link href={incomeData.getLink(item)} external>
            {incomeData.linkTitle}
          </Link>
        </>
      )}
    </>
  );

  return (
    <SectionCard
      title="Annual Income"
      subtitle={subtitle}
      className="min-w-[600px]"
    >
      <div className="p-5">
        <IncomeSlider
          gross={gross}
          setGross={setGross}
          income={selectedIncome}
          currency={item.country.currency}
        />
      </div>
    </SectionCard>
  );
};

export default CityIncomeSlider;

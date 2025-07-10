import Link from '@common/Link';
import { useUserContext } from '@context/user';
import apiService, { IncomeResponse } from '@services/api';
import IncomeSlider from '@shared/IncomeSlider';
import SectionCard from '@shared/SectionCard';
import { interpolateTranslations, useTranslations } from '@translations';
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
  const translations = useTranslations();
  const compTranslations = translations.city.cost.incomeSlider;
  const selectedIncome = income ?? ctxIncome;

  const incomeData = incomeUtils.getTypeData(selectedIncome.type, translations);
  const remoteCity = user.incomeRemote && cities && cities[user.incomeRemote];

  const subtitle = (
    <>
      {interpolateTranslations(compTranslations.subtitle, {
        incomeTitle: incomeData.title,
      })}
      {remoteCity &&
        interpolateTranslations(compTranslations.remoteTitle, {
          cityName: remoteCity.name,
          countryName: remoteCity.country.name,
        })}
      {incomeData.subtitle && ` (${incomeData.subtitle})`}
      {incomeData.getLink && incomeData.linkTitle && (
        <>
          {compTranslations.linkDescription}
          <Link href={incomeData.getLink(item)} external>
            {incomeData.linkTitle}
          </Link>
        </>
      )}
    </>
  );

  return (
    <SectionCard
      title={compTranslations.title}
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

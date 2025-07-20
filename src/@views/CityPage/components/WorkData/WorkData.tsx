import { useUserContext } from '@context/user';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import { IncomeType } from '@root/types';
import apiService from '@services/api';
import SectionCard from '@shared/SectionCard';
import { useQuery } from '@tanstack/react-query';
import { interpolateTranslations, useTranslations } from '@translations';
import { incomeUtils } from '@utils/income.utils';
import { findComparisonCity } from '@views/CityPage/components/WorkData/utils';
import { useCityContext } from '@views/CityPage/context';
import { useIncomeData } from '@views/CityPage/hooks';
import { useState } from 'react';

import { Item, JobsChart, OtherCityItem } from './components';

export const WorkData = () => {
  const { user } = useUserContext();
  const { marks, mark, income } = useIncomeData('income');
  const { item } = useCityContext();
  const translations = useTranslations();
  const compTranslations = translations.city.jobData;
  const { data: cities } = apiService.useCities();

  const [otherCity, setOtherCity] = useState(() =>
    findComparisonCity(item, cities!),
  );

  const userIncome = incomeUtils.getTypeData(user.income, translations);

  const { data: otherCityIncome } = useQuery({
    queryKey: ['getOtherCityIncome', otherCity, user.income],
    queryFn: () => apiService.income.get(otherCity, user.income),
    enabled: user.income !== IncomeType.None,
  });

  const otherCityMarks = otherCityIncome?.marks
    .concat(otherCityIncome.increments)
    .toSorted((a, b) => a.gross - b.gross);

  if (user.income === IncomeType.None || !cities) return null;

  const remoteCity = user.incomeRemote && cities[user.incomeRemote];

  const description = remoteCity
    ? interpolateTranslations(compTranslations.remoteDescription, {
        cityName: remoteCity.name,
        countryName: remoteCity.country.name,
      })
    : compTranslations.localDescription;

  return (
    <SectionCard
      title={compTranslations.title}
      subtitle={interpolateTranslations(compTranslations.subtitle, {
        incomeTitle: userIncome.title,
      })}
      TitleIcon={BusinessCenterRoundedIcon}
    >
      <>
        {!!mark && (
          <Item
            label={compTranslations.expectedSalary}
            description={description}
            gross={marks[mark].gross}
            net={marks[mark].net}
          />
        )}
        <OtherCityItem
          value={otherCity}
          onChange={setOtherCity}
          marks={otherCityMarks}
        />
      </>
      {income.jobs.length > 0 && (
        <div className="flex items-center gap-4 w-full mt-2">
          <JobsChart
            jobs={income.jobs}
            name={
              item.satelliteCity ? cities[item.satelliteCity].name : item.name
            }
          />
          <JobsChart
            jobs={otherCityIncome?.jobs}
            name={cities[otherCity].name}
          />
        </div>
      )}
    </SectionCard>
  );
};

import { useUserContext } from '@context/user';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import apiService, { IncomeType } from '@services/api';
import SectionCard from '@shared/SectionCard';
import { useQuery } from '@tanstack/react-query';
import { incomeUtils } from '@utils/income.utils';
import { findComparisonCity } from '@views/CityPage/components/WorkData/utils.ts';
import { useCityContext } from '@views/CityPage/context';
import { useIncomeData } from '@views/CityPage/hooks';
import { useState } from 'react';

import { Item, JobsChart, OtherCityItem } from './components';

export const WorkData = () => {
  const { user } = useUserContext();
  const { marks, mark, income } = useIncomeData('income');
  const { item } = useCityContext();
  const { data: cities } = apiService.useCities();

  const [otherCity, setOtherCity] = useState(() =>
    findComparisonCity(item, cities!),
  );

  const userIncome = incomeUtils.typeMap[user.income];

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
    ? `Based on working remotely from ${remoteCity.name}, ${remoteCity.country.name}`
    : 'Based on current compensation and industry standards';

  return (
    <SectionCard
      title="Job Data"
      subtitle={`As a ${userIncome.title}`}
      TitleIcon={BusinessCenterRoundedIcon}
    >
      <div>
        {!!mark && (
          <Item
            label="Expected Salary"
            description={description}
            gross={marks[mark].gross}
            net={marks[mark].net}
          />
        )}
        {otherCityMarks && (
          <OtherCityItem
            value={otherCity}
            onChange={setOtherCity}
            marks={otherCityMarks}
          />
        )}
      </div>
      {income.jobs.length > 0 && (
        <div className="flex items-center gap-4 w-full mt-2">
          <JobsChart
            jobs={income.jobs}
            name={
              item.satelliteCity ? cities[item.satelliteCity].name : item.name
            }
          />
          {!!otherCityIncome?.jobs.length && (
            <JobsChart
              jobs={otherCityIncome.jobs}
              name={cities[otherCity].name}
            />
          )}
        </div>
      )}
    </SectionCard>
  );
};

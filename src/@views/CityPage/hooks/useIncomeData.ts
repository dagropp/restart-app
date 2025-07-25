import { useUserContext } from '@context/user';
import { IncomeType } from '@root/types';
import { IncomeItem, IncomeResponse } from '@services/api';
import { useMemo } from 'react';

import { useCityContext } from '../context';

export interface IncomeItemData extends IncomeItem {
  isMajor: boolean;
}

export type IncomeData =
  | {
      income: IncomeResponse;
      marks: IncomeItemData[];
      incomeType: Exclude<IncomeType, 'None'>;
      mark: number;
      partner?: Omit<IncomeData, 'partner'>;
    }
  | {
      income: IncomeResponse;
      marks: IncomeItemData[];
      incomeType: IncomeType.None;
      mark?: undefined;
      partner?: Omit<IncomeData, 'partner'>;
    };

export const useIncomeData = (
  key: 'income' | 'partnerIncome' = 'income',
): IncomeData => {
  const {
    user: { incomeMark, income: incomeType },
  } = useUserContext();
  const cityContext = useCityContext();
  const defaultIncome: IncomeResponse = {
    lastUpdate: '',
    city: cityContext.item.id,
    marks: [],
    increments: [],
    type: IncomeType.None,
    jobs: [],
  };

  const income = cityContext[key] ?? defaultIncome;

  const marks: IncomeItemData[] = useMemo(
    () =>
      income?.marks
        .map((item) => ({ ...item, isMajor: true }))
        .concat(income.increments.map((item) => ({ ...item, isMajor: false })))
        .toSorted((a, b) => a.gross - b.gross),
    [income?.increments, income?.marks],
  );

  if (incomeType === IncomeType.None) {
    return { income, marks, incomeType: IncomeType.None };
  }

  return {
    income,
    marks,
    incomeType,
    mark: incomeMark ?? 0,
  };
};

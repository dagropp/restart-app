import { Currency } from '@root/types';
import {
  type CostNegativeState,
  type CostPositiveState,
  type CostResponse,
  CurrencyList,
  type SavedSimulation,
  UserResponse,
} from '@services/api';
import { is } from '@utils/is.utils';

import { type IncomeData } from '../../hooks';

interface ParsePresetData {
  preset: SavedSimulation;
  userIncome: IncomeData;
  partnerIncome: IncomeData;
  costData: CostResponse;
  currencies: CurrencyList;
  currency: Currency;
  userData: UserResponse;
  partnerData?: UserResponse;
  flightPrice?: number;
}

const createIncomePresetParser =
  (
    preset: SavedSimulation,
    userIncome: IncomeData,
    partnerIncome: IncomeData,
  ) =>
  (key: 'user' | 'partner'): Partial<CostPositiveState> => {
    if (is.emptyObject(preset.positiveState[key])) return {};
    const incomeData = key === 'user' ? userIncome : partnerIncome;
    return {
      [key]: {
        hidden: preset.positiveState[key].hidden,
        value: incomeData.marks[preset.positiveState[key].mark ?? 0].gross,
      },
    };
  };

const createStipendPresetParser =
  (
    preset: SavedSimulation,
    currencies: CurrencyList,
    currency: Currency,
    userData: UserResponse,
    partnerData?: UserResponse,
  ) =>
  (key: 'userStipend' | 'partnerStipend'): Partial<CostPositiveState> => {
    if (is.emptyObject(preset.positiveState[key])) return {};

    const data = key === 'userStipend' ? userData : partnerData;

    const value =
      data?.stipendValue && data?.stipendCurrency
        ? (data.stipendValue / currencies[data.stipendCurrency]) *
          currencies[currency]
        : 0;

    return {
      [key]: { hidden: preset.positiveState[key].hidden, value },
    };
  };

const createInstantiatedPresetParser =
  (preset: SavedSimulation, costData: CostResponse, flightPrice?: number) =>
  (key: 'flights' | 'school' | 'preschool'): Partial<CostNegativeState> => {
    const presetData = preset.negativeState[key];
    if (is.emptyObject(presetData)) return {};

    const value =
      key === 'flights'
        ? (flightPrice ?? 0)
        : key === 'school'
          ? costData.privateSchool
          : costData.preSchool;

    return {
      [key]: {
        value,
        instances: presetData.instances,
        hidden: presetData.hidden,
      },
    };
  };

export const parseRentPreset = (
  preset: SavedSimulation,
  rentPrice: number,
): Partial<CostNegativeState> => {
  const presetData = preset.negativeState.rent;
  if (is.emptyObject(presetData)) return {};

  const value = presetData.mark ? presetData.mark * rentPrice : rentPrice;

  return { rent: { value } };
};

export const parsePreset = ({
  preset,
  userIncome,
  partnerIncome,
  costData,
  currencies,
  currency,
  userData,
  partnerData,
  flightPrice,
}: ParsePresetData) => {
  const parseIncomePreset = createIncomePresetParser(
    preset,
    userIncome,
    partnerIncome,
  );
  const parseStipendPreset = createStipendPresetParser(
    preset,
    currencies,
    currency,
    userData,
    partnerData,
  );
  const parseInstantiatedPreset = createInstantiatedPresetParser(
    preset,
    costData,
    flightPrice,
  );
  const positive: Partial<CostPositiveState> = {
    ...parseIncomePreset('user'),
    ...parseIncomePreset('partner'),
    ...parseStipendPreset('userStipend'),
    ...parseStipendPreset('partnerStipend'),
  };
  const negative: Partial<CostNegativeState> = {
    ...parseRentPreset(preset, costData.rentOuter),
    ...parseInstantiatedPreset('flights'),
    ...parseInstantiatedPreset('preschool'),
    ...parseInstantiatedPreset('school'),
  };
  return { positive, negative };
};

export const generateSimulationSnapshot = (
  positiveState: CostPositiveState,
  negativeState: CostNegativeState,
  userIncome: IncomeData,
  partnerIncome: IncomeData,
  cost: CostResponse,
): Pick<SavedSimulation, 'positiveState' | 'negativeState'> => ({
  positiveState: {
    user: {
      hidden: positiveState.user.hidden,
      mark: userIncome.marks.findIndex(
        (mark) => mark.gross === positiveState.user.value,
      ),
    },
    userStipend: positiveState.userStipend
      ? { hidden: positiveState.userStipend.hidden }
      : {},
    partner: positiveState.partner
      ? {
          hidden: positiveState.partner.hidden,
          mark: partnerIncome.marks.findIndex(
            (mark) => mark.gross === positiveState.partner.value,
          ),
        }
      : {},
    partnerStipend: positiveState.partnerStipend
      ? { hidden: positiveState.partnerStipend.hidden }
      : {},
  },
  negativeState: {
    rent: { mark: negativeState.rent.value / cost.rentOuter },
    flights: {
      instances: negativeState.flights.instances,
      hidden: negativeState.flights.hidden,
    },
    school: {
      instances: negativeState.school.instances,
      hidden: negativeState.school.hidden,
    },
    preschool: {
      instances: negativeState.preschool.instances,
      hidden: negativeState.preschool.hidden,
    },
  },
});

export const getSelectedPreset = (
  data: SavedSimulation[],
  id?: number,
): SavedSimulation | undefined => {
  if (!is.nullOrUndefined(id)) return data.find((item) => item.id === id);
};

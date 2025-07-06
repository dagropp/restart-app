import Modal from '@common/Modal';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import { Currency, IncomeType } from '@root/types';
import {
  type CostNegativeState,
  type CostPositiveState,
  type IncomeItem,
} from '@services/api';
import { interpolateTranslations, useTranslations } from '@translations';
import { array } from '@utils/array.utils';
import { useEffect, useMemo, useReducer, useState } from 'react';

import CityIncomeSlider from '../components/CityIncomeSlider';
import CostEditor from '../components/CostEditor';
import { useFlightsData, useIncomeData } from '../hooks';
import { CostContext } from './CostContext';
import {
  type CostContextWrapperProps,
  type CostRowsList,
  type ICostContext,
} from './types';
import { useCityContext } from './useCityContext';

const DEFAULT_INCOME_ITEM: IncomeItem = { tax: 0, net: 0, gross: 0 };

export const CostContextWrapper = ({ children }: CostContextWrapperProps) => {
  const { currencies } = useAppContext();
  const { cost, item } = useCityContext();
  const { user, group } = useUserContext();
  const { cheapest } = useFlightsData();
  const { marks } = useIncomeData('income');
  const { marks: partnerMarks, income: partnerIncome } =
    useIncomeData('partnerIncome');
  const translations = useTranslations();
  const compTranslations = translations.city.cost.simulation;

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showPartnerIncomeModal, setShowPartnerIncomeModal] = useState(false);
  const [showCostModal, setShowCostModal] = useState(false);

  const convertStipend = (value: number, currency: Currency) =>
    (value / currencies[currency]) * currencies[item.country.currency];

  const [positiveState, updatePositiveState] = useReducer(
    (state: CostPositiveState, update: Partial<CostPositiveState>) => {
      return { ...state, ...update };
    },
    {
      user: { value: marks[user.incomeMark ?? 0].gross },
      partner: {
        value: partnerMarks[group.partner?.incomeMark ?? 0]?.gross ?? 0,
        hidden: false,
      },
      userTax: { value: 0 },
      partnerTax: { value: 0 },
      userStipend: {
        value:
          user.stipendValue && user.stipendCurrency
            ? convertStipend(user.stipendValue, user.stipendCurrency)
            : 0,
        hidden: !user.stipendValue,
      },
      partnerStipend: {
        value:
          group.partner?.stipendValue && group.partner?.stipendCurrency
            ? convertStipend(
                group.partner.stipendValue,
                group.partner.stipendCurrency,
              )
            : 0,
        hidden: !group.partner?.stipendValue,
      },
    },
  );

  useEffect(() => {
    if (partnerMarks.length) {
      updatePositiveState({
        partner: {
          value: partnerMarks[group.partner?.incomeMark ?? 0]?.gross ?? 0,
          hidden: false,
        },
      });
    }
  }, [group.partner?.incomeMark, partnerMarks]);

  useEffect(() => {
    updatePositiveState({
      user: { value: marks[user.incomeMark ?? 0].gross },
    });
  }, [marks, user.incomeMark]);

  const [negativeState, updateNegativeState] = useReducer(
    (state: CostNegativeState, update: Partial<CostNegativeState>) => {
      return { ...state, ...update };
    },
    {
      general: { value: cost.generalCost },
      rent: { value: cost.rentOuter },
    } as CostNegativeState,
  );

  const selectedUserIncome =
    marks.find((value) => value.gross === positiveState.user.value) ??
    DEFAULT_INCOME_ITEM;

  const selectedPartnerIncome = positiveState.partner.hidden
    ? DEFAULT_INCOME_ITEM
    : (partnerMarks.find(
        (value) => value.gross === positiveState.partner.value,
      ) ?? DEFAULT_INCOME_ITEM);

  const userTax = positiveState.user.hidden
    ? 0
    : selectedUserIncome.net / 12 - positiveState.user.value / 12;
  const partnerTax = positiveState.partner.hidden
    ? 0
    : selectedPartnerIncome.net / 12 - positiveState.partner.value / 12;

  const positiveRows = useMemo(() => {
    const rows: CostRowsList<CostPositiveState> = {
      user: {
        label: interpolateTranslations(compTranslations.grossIncome, {
          name: user.firstName,
        }),
        onEdit: () => setShowIncomeModal(true),
        optional: true,
        mapper: (value) => value / 12,
      },
      userTax: {
        label: compTranslations.tax,
        mapper: () => userTax,
      },
    };

    if (user.stipendValue) {
      rows.userStipend = {
        label: interpolateTranslations(compTranslations.stipend, {
          name: user.firstName,
        }),
        optional: true,
      };
    }

    if (group.partner?.stipendValue) {
      rows.partnerStipend = {
        label: interpolateTranslations(compTranslations.stipend, {
          name: group.partner.firstName,
        }),
        optional: true,
      };
    }

    if (group.partner && group.partner.income !== IncomeType.None) {
      rows.partner = {
        label: interpolateTranslations(compTranslations.grossIncome, {
          name: group.partner?.firstName,
        }),
        onEdit: () => setShowPartnerIncomeModal(true),
        optional: true,
        mapper: (value) => value / 12,
      };
      rows.partnerTax = {
        label: compTranslations.tax,
        mapper: () => partnerTax,
      };
    }

    return rows;
  }, [
    compTranslations.grossIncome,
    compTranslations.stipend,
    compTranslations.tax,
    group.partner,
    partnerTax,
    user.firstName,
    user.stipendValue,
    userTax,
  ]);

  const childrenCount = group.children.length;
  const adultCount = group.partner ? 2 : 1;

  const negativeRows = useMemo(() => {
    const rows: CostRowsList<CostNegativeState> = {
      rent: {
        label: translations.city.cost.rent.title,
        onEdit: () => setShowCostModal(true),
        tooltip: interpolateTranslations(compTranslations.rentDescription, {
          bedrooms:
            group.bedrooms === 1
              ? translations.city.cost.rent.bedroomSingle
              : interpolateTranslations(translations.city.cost.rent.bedrooms, {
                  bedrooms: group.bedrooms,
                }),
        }),
      },
      general: {
        label: compTranslations.generalCost,
        tooltip: childrenCount
          ? interpolateTranslations(compTranslations.familyLabel, {
              adults:
                adultCount === 1
                  ? translations.group.adultSingle
                  : interpolateTranslations(translations.group.adults, {
                      adults: adultCount,
                    }),
              children:
                childrenCount === 1
                  ? translations.group.childSingle
                  : interpolateTranslations(translations.group.children, {
                      children: childrenCount,
                    }),
            })
          : adultCount === 1
            ? compTranslations.singleAdult
            : compTranslations.couple,
      },
    };

    if (cheapest?.price) {
      const groupSize = (group.partner ? 1 : 0) + group.children.length + 1;
      rows.flights = {
        label: interpolateTranslations(compTranslations.flights, {
          airport: item.airport,
        }),
        optional: true,
        mapper: (value) => (value * groupSize) / 12,
      };
      updateNegativeState({
        flights: { hidden: true, value: cheapest.price, instances: 1 },
      });
    }

    const { preschool, school } = Object.groupBy(group.children, (child) =>
      child.ageAtDeparture < 6 ? 'preschool' : 'school',
    );

    if (preschool?.length) {
      rows.preschool = {
        label: `Private Preschool (${array.joinWithLast(
          preschool.map((child) => child.name),
          ', ',
          ' and ',
        )})`,
        optional: true,
      };
      updateNegativeState({
        preschool: {
          hidden: true,
          value: cost.preSchool,
          instances: preschool.length > 1 ? preschool.length : undefined,
          maxInstances: preschool.length,
        },
      });
    }

    if (school?.length) {
      rows.school = {
        label: `Private School (${array.joinWithLast(
          school.map((child) => child.name),
          ', ',
          ' and ',
        )})`,
        optional: true,
      };
      updateNegativeState({
        school: {
          hidden: true,
          value: cost.privateSchool,
          instances: school.length > 1 ? school.length : undefined,
          maxInstances: school.length,
        },
      });
    }

    return rows;
  }, [
    adultCount,
    cheapest?.price,
    childrenCount,
    compTranslations.couple,
    compTranslations.familyLabel,
    compTranslations.flights,
    compTranslations.generalCost,
    compTranslations.preschool,
    compTranslations.rentDescription,
    compTranslations.school,
    compTranslations.singleAdult,
    cost.preSchool,
    cost.privateSchool,
    group.bedrooms,
    group.children,
    group.partner,
    item.airport,
    translations.city.cost.rent.bedroomSingle,
    translations.city.cost.rent.bedrooms,
    translations.city.cost.rent.title,
    translations.group.adultSingle,
    translations.group.adults,
    translations.group.childSingle,
    translations.group.children,
  ]);

  const value: ICostContext = {
    positive: positiveRows,
    negative: negativeRows,
    positiveState,
    updatePositiveState,
    negativeState,
    updateNegativeState,
  };

  return (
    <CostContext value={value}>
      {children}
      <Modal open={showIncomeModal} onClose={() => setShowIncomeModal(false)}>
        <CityIncomeSlider
          gross={positiveState.user.value}
          setGross={(value) => updatePositiveState({ user: { value } })}
        />
      </Modal>
      <Modal
        open={showPartnerIncomeModal}
        onClose={() => setShowPartnerIncomeModal(false)}
      >
        <CityIncomeSlider
          gross={positiveState.partner.value}
          setGross={(value) =>
            updatePositiveState({
              partner: { value, hidden: positiveState.partner.hidden },
            })
          }
          income={partnerIncome}
        />
      </Modal>
      <Modal open={showCostModal} onClose={() => setShowCostModal(false)}>
        <CostEditor
          rent={negativeState.rent.value}
          setRent={(value) => updateNegativeState({ rent: { value } })}
        />
      </Modal>
    </CostContext>
  );
};

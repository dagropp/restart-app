import Modal from '@common/Modal';
import { useAppContext } from '@context/app';
import { useUserContext } from '@context/user';
import { Currency, IncomeType } from '@root/types';
import { IncomeItem } from '@services/api';
import { useEffect, useMemo, useReducer, useState } from 'react';

import CityIncomeSlider from '../components/CityIncomeSlider';
import CostEditor from '../components/CostEditor';
import { useFlightsData, useIncomeData } from '../hooks';
import { CostContext } from './CostContext';
import {
  type CostContextWrapperProps,
  CostNegativeState,
  CostPositiveState,
  CostRowsList,
  ICostContext,
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
    { general: { value: cost.generalCost }, rent: { value: cost.rentOuter } },
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
        label: `${user.firstName}'s Gross Income`,
        onEdit: () => setShowIncomeModal(true),
        optional: true,
        mapper: (value) => value / 12,
      },
      userTax: {
        label: 'Tax',
        mapper: () => userTax,
      },
    };

    if (user.stipendValue) {
      rows.userStipend = {
        label: `${user.firstName}'s Stipend / Scholarship`,
        optional: true,
      };
    }

    if (group.partner?.stipendValue) {
      rows.partnerStipend = {
        label: `${group.partner.firstName}'s Stipend / Scholarship`,
        optional: true,
      };
    }

    if (group.partner && group.partner.income !== IncomeType.None) {
      rows.partner = {
        label: `${group.partner?.firstName}'s Gross Income`,
        onEdit: () => setShowPartnerIncomeModal(true),
        optional: true,
        mapper: (value) => value / 12,
      };
      rows.partnerTax = {
        label: 'Tax',
        mapper: () => partnerTax,
      };
    }

    return rows;
  }, [group.partner, partnerTax, user.firstName, user.stipendValue, userTax]);

  const childrenCount = group.children.length;
  const adultCount = group.partner ? 2 : 1;

  const negativeRows = useMemo(() => {
    const rows: CostRowsList<CostNegativeState> = {
      rent: {
        label: 'Rent',
        onEdit: () => setShowCostModal(true),
        tooltip: `For a ${group.bedrooms === 1 ? '1 bedroom' : `${group.bedrooms} bedrooms`} apartment`,
      },
      general: {
        label: 'General Cost',
        tooltip: childrenCount
          ? `For a family of ${adultCount === 1 ? '1 adult' : '2 adults'} and ${childrenCount === 1 ? '1 child' : `${childrenCount} children`}`
          : adultCount === 1
            ? 'For a single adult'
            : 'For a couple',
      },
    };

    if (cheapest?.price) {
      const key = 'flights' as string;
      const groupSize = (group.partner ? 1 : 0) + group.children.length;
      rows[key] = {
        label: `${item.airport}-TLV Flights / Year`,
        optional: true,
        mapper: (value) => (value * groupSize) / 12,
      };
      updateNegativeState({
        [key]: { hidden: true, value: cheapest.price * 4, instances: 1 },
      });
    }

    group.children.forEach((child) => {
      const key = `child-${child.name}`;
      if (child.ageAtDeparture < 6) {
        rows[key] = {
          label: `${child.name}'s Pre-school`,
          optional: true,
        };
        updateNegativeState({ [key]: { hidden: true, value: cost.preSchool } });
      } else if (child.ageAtDeparture <= 18) {
        rows[key] = {
          label: `${child.name}'s Private School`,
          optional: true,
        };
        updateNegativeState({
          [key]: { hidden: true, value: cost.privateSchool },
        });
      }
    });

    return rows;
  }, [
    adultCount,
    cheapest?.price,
    childrenCount,
    cost.preSchool,
    cost.privateSchool,
    group.bedrooms,
    group.children,
    group.partner,
    item.airport,
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

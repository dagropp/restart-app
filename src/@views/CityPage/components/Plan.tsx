import { useUserContext } from '@context/user';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import { Divider } from '@mui/material';
import { PriceItem } from '@shared/Prices';
import SectionCard from '@shared/SectionCard';
import { formatCurrency } from '@utils/format.utils';
import { number } from '@utils/number.utils';
import { useMemo } from 'react';

import { useCityContext } from '../context';
import { useFlightsData } from '../hooks';

export const Plan = () => {
  const {
    group: { partner, children },
  } = useUserContext();
  const {
    cost: { generalCost, rentOuter },
    currencyConverter,
    item: { country },
  } = useCityContext();
  const { cheapest } = useFlightsData();

  const headCount = { adults: partner ? 2 : 1, children: children.length };

  const headCountCaption = useMemo(
    () =>
      [
        headCount.adults === 1 ? '1 adult' : '2 adults',
        headCount.children
          ? headCount.children === 1
            ? '1 child'
            : `${headCount.children} children`
          : '',
      ]
        .filter(Boolean)
        .join(' and '),
    [headCount.adults, headCount.children],
  );

  const flightPrice = cheapest?.price ?? 0;
  const onWayTicket = headCount.adults + headCount.children * flightPrice;
  const totalPeople = headCount.adults + headCount.children;

  const items = [
    {
      key: 'cost',
      Icon: PointOfSaleRoundedIcon,
      label: 'General Cost',
      caption: '× 3 Months',
      value: generalCost * 3,
    },
    {
      key: 'rent',
      Icon: ApartmentRoundedIcon,
      label: 'Rent',
      caption: '× 3 Months',
      value: rentOuter * 3,
    },
    {
      key: 'ticket-1way',
      Icon: AirplaneTicketRoundedIcon,
      label: 'One-Way Flight',
      caption: `× ${totalPeople} People`,
      value: onWayTicket,
    },
  ];

  const total = number.sum(...items.map((item) => item.value));

  return (
    <SectionCard
      title="Plan Ahead"
      TitleIcon={SavingsRoundedIcon}
      subtitle={headCountCaption}
    >
      <div className="flex flex-col gap-4">
        {items.map(({ key, value, ...props }) => (
          <PriceItem
            key={key}
            formattedValue={formatCurrency(value, country.currency)}
            convertedValue={currencyConverter(value, true)}
            {...props}
          />
        ))}
        <Divider />
        <PriceItem
          label="Total"
          formattedValue={formatCurrency(total, country.currency)}
          convertedValue={currencyConverter(total)}
        />
      </div>
    </SectionCard>
  );
};

import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EscalatorWarningRoundedIcon from '@mui/icons-material/EscalatorWarningRounded';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import TollRoundedIcon from '@mui/icons-material/TollRounded';
import IconButton from '@mui/material/IconButton';
import { ChildrenResponse, IncomeType } from '@services/api';
import SectionCard from '@shared/SectionCard';
import { useTranslations } from '@translations';
import { incomeUtils } from '@utils/income.utils';
import dayjs from 'dayjs';

import { ListItem } from './types';

const getChildrenTooltip = (children: ChildrenResponse[]) => {
  const sorted = children.toSorted((a, b) =>
    a.dateOfBirth.localeCompare(b.dateOfBirth),
  );
  const prefix = sorted
    .slice(0, -1)
    .map((child) => child.name)
    .join(', ');
  return `${prefix} and ${sorted.at(-1)?.name}`;
};

export const GroupDisplay = () => {
  const { group, user } = useUserContext();
  const translations = useTranslations();

  const incomes = [user.income, group.partner?.income].filter(
    (income) => income && income !== IncomeType.None,
  );

  const items: ListItem[] = [
    {
      key: 'departureDate',
      label: 'Departure Date',
      value: dayjs(group.departureDate).format('MMMM YYYY'),
      Icon: FlightTakeoffRoundedIcon,
    },
    {
      key: 'childrenCount',
      label: 'Number of Children',
      value: group.children.length,
      Icon: EscalatorWarningRoundedIcon,
      tooltip: getChildrenTooltip(group.children),
    },
    {
      key: 'incomeCount',
      label: 'Number of Incomes',
      value: incomes.length,
      Icon: TollRoundedIcon,
      tooltip: incomes
        .map((income) => incomeUtils.getTypeData(income!, translations).title)
        .join(' and '),
    },
    {
      key: 'apartment',
      label: 'Apartment Size',
      value: group.bedrooms === 1 ? '1 Bedroom' : `${group.bedrooms} Bedrooms`,
      Icon: ApartmentRoundedIcon,
    },
  ];

  return (
    <SectionCard
      title={
        <div className="flex justify-between items-center w-full">
          <span className="flex items-center gap-4">Group</span>
          <IconButton size="small" component={Link} href="/settings/group">
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {items.map(({ key, label, value, Icon, tooltip }) => (
          <Typography
            key={key}
            variant="body2"
            className="flex items-center justify-between"
          >
            <span className="flex gap-2 items-center">
              <Icon fontSize="small" />
              <strong>{label}</strong>
            </span>
            <Tooltip title={tooltip} placement="left">
              <span>{value}</span>
            </Tooltip>
          </Typography>
        ))}
      </div>
    </SectionCard>
  );
};

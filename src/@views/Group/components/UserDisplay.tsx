import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import IconButton from '@mui/material/IconButton';
import apiService, { UserResponse } from '@services/api';
import { CountryImage } from '@shared/CountryDisplay';
import SectionCard from '@shared/SectionCard';
import UserAvatar from '@shared/UserAvatar';
import { incomeUtils } from '@utils/income.utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { ListItem } from './types';

interface Props {
  user: UserResponse;
  editLink?: string;
}

const getAge = (diff: number) => {
  const months = Math.abs(diff % 12);
  const years = Math.abs(Math.floor(diff / 12));
  return {
    value: years,
    label: months ? `${years} years and ${months} months` : `${years} years`,
  };
};

export const UserDisplay = ({ user, editLink }: Props) => {
  const { group } = useUserContext();
  const { data: countries } = apiService.countries.use();

  const userAge = useMemo(
    () => getAge(dayjs(user.dateOfBirth).diff(dayjs(), 'months')),
    [user.dateOfBirth],
  );
  const ageAtDeparture = useMemo(
    () =>
      getAge(
        dayjs(user.dateOfBirth).diff(dayjs(group.departureDate), 'months'),
      ),
    [group.departureDate, user.dateOfBirth],
  );

  const items: ListItem[] = [
    {
      key: 'email',
      label: 'Email',
      value: (
        <Link href={`mailto:${user.email}`} external externalIconHidden>
          {user.email}
        </Link>
      ),
      Icon: AlternateEmailRoundedIcon,
    },
    {
      key: 'profession',
      label: 'Profession',
      value: incomeUtils.typeMap[user.income].title,
      tooltip: incomeUtils.typeMap[user.income].subtitle,
      Icon: BusinessCenterRoundedIcon,
    },
    {
      key: 'age',
      label: 'Current Age',
      value: userAge.value,
      tooltip: userAge.label,
      Icon: DateRangeRoundedIcon,
    },
    {
      key: 'departureDate',
      label: 'Age at Departure',
      value: ageAtDeparture.value,
      tooltip: `${ageAtDeparture.label}`,
      Icon: CalendarMonthRoundedIcon,
    },
    {
      key: 'citizenship',
      label: 'Citizenship',
      Icon: PublicRoundedIcon,
      value: (
        <span className="flex gap-2 items-center">
          {user.citizenship.map((citizenship) => (
            <Tooltip
              key={citizenship}
              title={countries?.[citizenship]?.name}
              placement="bottom"
            >
              <CountryImage country={citizenship} className="h-4" />
            </Tooltip>
          ))}
        </span>
      ),
    },
    {
      key: 'type',
      label: 'User Type',
      Icon: SecurityRoundedIcon,
      value: user.type,
    },
  ];

  return (
    <SectionCard
      title={
        <div className="flex justify-between items-center w-full">
          <span className="flex items-center gap-4">
            <UserAvatar
              avatar={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
            />
            {user.firstName} {user.lastName}
          </span>
          {editLink && (
            <IconButton size="small" component={Link} href={editLink}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          )}
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

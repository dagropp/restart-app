import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import SectionCard from '@shared/SectionCard';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { ListItemsGroup } from './types';

const getChildAge = (dateOfBirth: string, ref?: string) => {
  const diff = Math.abs(dayjs(dateOfBirth).diff(dayjs(ref), 'months'));
  const months = diff % 12;
  const years = Math.floor(diff / 12);
  return {
    value: years,
    label: months ? `${years} years and ${months} months` : `${years} years`,
  };
};

export const ChildrenDisplay = () => {
  const { group } = useUserContext();
  const theme = useTheme();

  const groups: ListItemsGroup[] = group.children
    .toSorted((a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth))
    .map((child) => {
      const currentAge = getChildAge(child.dateOfBirth);
      const departureAge = getChildAge(child.dateOfBirth, group.departureDate);
      return {
        key: child.id,
        items: [
          {
            key: `${child.id}-name`,
            label: 'Name',
            value: child.name,
            Icon: ChildCareRoundedIcon,
          },
          {
            key: `${child.id}-currentAge`,
            label: 'Current Age',
            value: currentAge.value,
            tooltip: currentAge.label,
            Icon: DateRangeRoundedIcon,
          },
          {
            key: `${child.id}-departureAge`,
            label: 'Age at Departure',
            value: departureAge.value,
            tooltip: departureAge.label,
            Icon: CalendarMonthRoundedIcon,
          },
        ],
      };
    });

  return (
    <SectionCard
      title={
        <div className="flex justify-between items-center w-full">
          <span className="flex items-center gap-4">Children</span>
          <IconButton size="small" component={Link} href="/settings/group">
            <EditRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      }
    >
      {groups.map(({ key, items }, index) => (
        <div
          key={key}
          className={clsx(
            'flex flex-col gap-4',
            index !== groups.length - 1 && 'border-b pb-4 mb-4',
          )}
          style={{ borderColor: theme.palette.divider }}
        >
          {items.map(({ key, Icon, label, tooltip, value }) => (
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
      ))}
    </SectionCard>
  );
};

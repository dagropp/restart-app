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
import { IncomeType } from '@root/types';
import { ChildrenResponse } from '@services/api';
import dateService from '@services/date.service.ts';
import SectionCard from '@shared/SectionCard';
import {
  interpolateTranslations,
  ITranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { array } from '@utils/array.utils.ts';
import { incomeUtils } from '@utils/income.utils';

import { ListItem } from './types';

const getChildrenTooltip = (
  children: ChildrenResponse[],
  translations: ITranslations,
) => {
  const sorted = children.toSorted((a, b) =>
    a.dateOfBirth.localeCompare(b.dateOfBirth),
  );

  return array.joinWithLast(
    sorted.map((child) => child.name),
    ', ',
    translations.group.details.childrenNameConnector,
  );
};

export const GroupDisplay = () => {
  const { group, user } = useUserContext();
  const translations = useTranslations();
  const compTranslations = translations.group.details;
  const { isRtl, language } = useTranslationsContext();

  const incomes = [user.income, group.partner?.income].filter(
    (income) => income && income !== IncomeType.None,
  );

  const items: ListItem[] = [
    {
      key: 'departureDate',
      label: compTranslations.departureDate,
      value: dateService.formatReadableDate(group.departureDate, language),
      Icon: FlightTakeoffRoundedIcon,
    },
    {
      key: 'childrenCount',
      label: compTranslations.numberOfChildren,
      value: group.children.length,
      Icon: EscalatorWarningRoundedIcon,
      tooltip: getChildrenTooltip(group.children, translations),
    },
    {
      key: 'incomeCount',
      label: compTranslations.numberOfIncomes,
      value: incomes.length,
      Icon: TollRoundedIcon,
      tooltip: incomes
        .map((income) => incomeUtils.getTypeData(income!, translations).title)
        .join(compTranslations.childrenNameConnector),
    },
    {
      key: 'apartment',
      label: compTranslations.apartmentSize,
      value:
        group.bedrooms === 1
          ? compTranslations.apartmentBedroomsSingle
          : interpolateTranslations(compTranslations.apartmentBedrooms, {
              bedrooms: group.bedrooms,
            }),
      Icon: ApartmentRoundedIcon,
    },
  ];

  return (
    <SectionCard
      title={
        <div className="flex justify-between items-center w-full">
          <span className="flex items-center gap-4">
            {translations.menu.primary.group}
          </span>
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
            <Tooltip
              title={tooltip}
              placement="left"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              <span>{value}</span>
            </Tooltip>
          </Typography>
        ))}
      </div>
    </SectionCard>
  );
};

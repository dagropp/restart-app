import Link from '@common/Link';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { alpha, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { City, Country } from '@root/types';
import apiService from '@services/api';
import dateService from '@services/date.service.ts';
import storageService from '@services/storage';
import SectionCard from '@shared/SectionCard';
import { UserInviteDialog } from '@shared/UserInviteDialog';
import {
  interpolateTranslations,
  ITranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { array } from '@utils/array.utils.ts';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

type ItemStatus = 'done' | 'pending' | 'none';

interface ItemProps {
  status: ItemStatus;
  label: string;
  children?: ReactNode;
}

interface FavoritesListItem {
  isCity: boolean;
  name: string;
  path: string;
  id: Country | City;
}

const getCountdownDisplay = (
  departureDate: string,
  translations: ITranslations,
) => {
  const start = dayjs();
  const end = dayjs(departureDate);
  let diff = dayjs.duration(end.diff(start));
  const t = translations.group.progress;

  const years = diff.years();
  diff = diff.subtract(years, 'year');
  const months = diff.months();
  diff = diff.subtract(months, 'month');
  const days = diff.days();

  const list = [
    years === 1
      ? t.yearSingle
      : years
        ? interpolateTranslations(t.years, { years })
        : '',
    months === 1
      ? t.monthSingle
      : months
        ? interpolateTranslations(t.months, { months })
        : '',
    days === 1
      ? t.daySingle
      : days
        ? interpolateTranslations(t.days, { days })
        : '',
  ].filter(Boolean);

  return array.joinWithLast(list, ', ', t.countdownConnector);
};

const getCardBg = (theme: Theme) =>
  `linear-gradient(to bottom, ${alpha(theme.palette.info.main, 0.3)}, ${alpha(theme.palette.info.light, 0.3)})`;

const getIndicatorColor = (theme: Theme) => theme.palette.info.light;

const Item = ({ status, label, children }: ItemProps) => {
  const Icon =
    status === 'done'
      ? CheckRoundedIcon
      : status === 'none'
        ? ClearRoundedIcon
        : MoreHorizRoundedIcon;
  const { isRtl } = useTranslationsContext();

  return (
    <div className="relative z-10 flex flex-col">
      <div className="flex items-center gap-2">
        <Box
          className="rounded-full flex items-center justify-center p-0.5 text-white"
          sx={{ bgcolor: getIndicatorColor }}
        >
          <Icon
            fontSize="small"
            sx={{
              color: (theme) =>
                status === 'none'
                  ? alpha(theme.palette.background.default, 0.6)
                  : theme.palette.primary.contrastText,
            }}
          />
        </Box>

        <Typography variant="body2">
          <strong>{label}</strong>
        </Typography>
      </div>
      {children && (
        <div className="pl-7.5">
          <Typography variant="body2" dir={isRtl ? 'rtl' : 'ltr'} align="left">
            {children}
          </Typography>
        </div>
      )}
    </div>
  );
};

const GroupSetupItem = () => {
  const {
    group: { partner, children },
  } = useUserContext();
  const translations = useTranslations().group.progress;

  const hasChildren = children.length > 0;
  const status = hasChildren ? (partner ? 'done' : 'none') : 'done';
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Item status={status} label={translations.setupPartner}>
      {status === 'done' ? (
        <span>
          {hasChildren ? translations.partnerSet : translations.partnerNoNeed}
        </span>
      ) : (
        <span>
          <Link onClick={openDialog}>{translations.invitePartner}</Link>
          <UserInviteDialog
            open={isDialogOpen}
            onClose={closeDialog}
            isGroupInvite
          />
        </span>
      )}
    </Item>
  );
};

const DepartureDateItem = () => {
  const {
    group: { departureDate },
  } = useUserContext();
  const translations = useTranslations();
  const compTranslations = translations.group.progress;
  const status = departureDate ? 'done' : 'none';
  const countdown = getCountdownDisplay(departureDate, translations);
  const { language } = useTranslationsContext();

  return (
    <Item status={status} label={compTranslations.setDepartureDate}>
      {status === 'done' ? (
        <span>
          {dateService.formatReadableDate(departureDate, language)}
          {countdown
            ? interpolateTranslations(compTranslations.countdownResult, {
                countdown,
              })
            : compTranslations.goTime}
        </span>
      ) : (
        <Link href="/settings/group">
          {compTranslations.setDepartureDateAction}
        </Link>
      )}
    </Item>
  );
};

const FavoritesItem = () => {
  const { group } = useUserContext();
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();
  const translations = useTranslations().group.progress;

  const isDestination = !!group.destination && group.destination in City;
  const isDone =
    !!cities &&
    !!countries &&
    (group.bookmarks.length > 0 || !!group.destination);

  const list: FavoritesListItem[] = useMemo(() => {
    if (!cities || !countries) return [];

    const favorites = group.destination
      ? [...group.bookmarks, group.destination]
      : group.bookmarks;
    return favorites
      .map((item) => {
        const isCity = item in City;
        const { name, id } = isCity
          ? cities[item as City]
          : countries[item as Country];
        const path = isCity ? `/city/${id}` : `/countries/${id}`;
        return { isCity, name, path, id };
      })
      .toSorted((a, b) =>
        a.isCity !== b.isCity
          ? Number(a.isCity) - Number(b.isCity)
          : a.name.localeCompare(b.name),
      );
  }, [cities, countries, group.bookmarks, group.destination]);

  const status = isDone ? 'done' : 'none';

  return (
    <Item status={status} label={translations.markPlaces}>
      {isDestination ? (
        <span>{translations.selectedDestination}</span>
      ) : isDone ? (
        list.map(({ id, name, path }, index) => (
          <span
            className={clsx(
              index !== list.length - 1 && 'after:content-[","] after:me-1',
            )}
          >
            <Link key={id} href={path}>
              {name}
            </Link>
          </span>
        ))
      ) : (
        <span>
          {translations.markPlacesAction1}
          <Link href="/countries">{translations.markPlacesAction2}</Link>
          {translations.markPlacesAction3}
          <Link href="/">{translations.markPlacesAction4}</Link>
          {translations.markPlacesAction5}
        </span>
      )}
    </Item>
  );
};

const DestinationItem = () => {
  const {
    group: { destination },
  } = useUserContext();
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();
  const navigate = useNavigate();
  const translations = useTranslations().group.progress;

  const handleListClick = () => {
    storageService.setFilters('cities', {
      countries: JSON.stringify([destination]),
    });
    navigate('/');
  };

  const status = !destination
    ? 'none'
    : destination in City
      ? 'done'
      : 'pending';

  return (
    <Item status={status} label={translations.chooseDestination}>
      {status === 'done' ? (
        <Link href={`/city/${destination}`}>
          {cities?.[destination as City].name}
        </Link>
      ) : status === 'pending' ? (
        <span>
          <Link href={`/city/${destination}`}>
            {countries?.[destination as Country].name}
          </Link>
          {translations.chooseDestinationPartialAction1}
          <Link onClick={handleListClick}>
            {translations.chooseDestinationPartialAction2}
          </Link>
        </span>
      ) : (
        <span>
          {translations.chooseDestinationAction}
          <Link href="/">{translations.chooseDestinationPartialAction2}</Link>
        </span>
      )}
    </Item>
  );
};

const ResearchItem = () => {
  const {
    group: { destination },
  } = useUserContext();
  const isDestination = !!destination && destination in City;
  const translations = useTranslations().group.progress;

  const { data: notes = 0 } = apiService.notes.useCount(
    destination!,
    isDestination,
  );

  const status =
    !isDestination || !notes ? 'none' : notes > 10 ? 'done' : 'pending';

  const link = `/city/${destination}/notes`;

  return (
    <Item status={status} label={translations.researchDestination}>
      {status === 'done' ? (
        <span>
          {translations.addedNotes}
          <Link href={link}>
            {interpolateTranslations(translations.notes, {
              notes: notes.toLocaleString(),
            })}
          </Link>
        </span>
      ) : isDestination ? (
        <span>
          {notes === 1
            ? translations.addedSingleNote
            : notes > 0
              ? interpolateTranslations(translations.addedNotesFull, {
                  notes: notes.toLocaleString(),
                })
              : ''}{' '}
          <Link href={link}>
            {notes ? translations.addMoreNotes : translations.startAddingNotes}
          </Link>
          {translations.toYourDestination}
        </span>
      ) : (
        <span>{translations.noDestination}</span>
      )}
    </Item>
  );
};

export const ProgressWidget = () => {
  const theme = useTheme();
  const translations = useTranslations().group.progress;

  return (
    <SectionCard
      style={{ background: getCardBg(theme), border: 'none' }}
      title={translations.title}
    >
      <div className="pl-5">
        <div className="flex flex-col gap-4 relative">
          <GroupSetupItem />
          <DepartureDateItem />
          <FavoritesItem />
          <DestinationItem />
          <ResearchItem />
          <Box
            className="absolute border-l border-2 top-2 bottom-6 left-[9px]"
            sx={{ borderColor: getIndicatorColor }}
          />
        </div>
      </div>
    </SectionCard>
  );
};

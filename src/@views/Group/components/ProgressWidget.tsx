import Link from '@common/Link';
import Typography from '@common/Typography';
import { useUserContext } from '@context/user';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { alpha, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import apiService, { City, Country } from '@services/api';
import storageService from '@services/storage';
import SectionCard from '@shared/SectionCard';
import { UserInviteDialog } from '@shared/UserInviteDialog.tsx';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

interface ItemProps {
  isDone: boolean;
  label: string;
  children?: ReactNode;
}

interface FavoritesListItem {
  isCity: boolean;
  name: string;
  path: string;
  id: Country | City;
}

const getCountdownDisplay = (departureDate: string) => {
  const start = dayjs();
  const end = dayjs(departureDate);
  let diff = dayjs.duration(end.diff(start));

  const years = diff.years();
  diff = diff.subtract(years, 'year');
  const months = diff.months();
  diff = diff.subtract(months, 'month');
  const days = diff.days();

  const list = [
    years === 1 ? '1 year' : years ? `${years} years` : '',
    months === 1 ? '1 month' : months ? `${months} months` : '',
    days === 1 ? '1 day' : days ? `${days} days` : '',
  ].filter(Boolean);

  return !list.length
    ? ''
    : list.length === 1
      ? list[0]
      : `${list.slice(0, -1).join(', ')} and ${list.at(-1)}`;
};

const getCardBg = (theme: Theme) =>
  `linear-gradient(to bottom, ${alpha(theme.palette.info.main, 0.3)}, ${alpha(theme.palette.info.light, 0.3)})`;

const getIndicatorColor = (theme: Theme) => theme.palette.info.light;

const Item = ({ isDone, label, children }: ItemProps) => {
  const Icon = isDone ? CheckRoundedIcon : ClearRoundedIcon;

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
                isDone
                  ? theme.palette.primary.contrastText
                  : alpha(theme.palette.background.default, 0.6),
            }}
          />
        </Box>

        <Typography variant="body2">
          <strong>{label}</strong>
        </Typography>
      </div>
      {children && (
        <div className="pl-7.5">
          <Typography variant="body2">{children}</Typography>
        </div>
      )}
    </div>
  );
};

const GroupSetupItem = () => {
  const {
    group: { partner, children },
  } = useUserContext();
  const isDone = children.length ? !!partner : true;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <Item isDone={isDone} label="Setup Partner">
      {isDone ? (
        <span>
          Partner is set to {partner?.firstName} {partner?.lastName}
        </span>
      ) : (
        <span>
          <Link onClick={openDialog}>Invite partner</Link>
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
  const isDone = !!departureDate;
  const countdown = getCountdownDisplay(departureDate);

  return (
    <Item isDone={isDone} label="Set Departure Date">
      {isDone ? (
        <span>
          {dayjs(departureDate).format('MMMM YYYY')} -{' '}
          {countdown ? (
            <>
              only <strong>{countdown}</strong> to go!
            </>
          ) : (
            "it's go time!"
          )}
        </span>
      ) : (
        <Link href="/settings/group">Set departure date</Link>
      )}
    </Item>
  );
};

const FavoritesItem = () => {
  const { group } = useUserContext();
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();

  const isDestination = group.destination in City;
  const isDone =
    !!cities && !!countries && (group.bookmarks.length > 0 || isDestination);

  const list: FavoritesListItem[] = useMemo(() => {
    if (!isDone) return [];
    return group.bookmarks
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
  }, [cities, countries, group.bookmarks, isDone]);

  return (
    <Item isDone={isDone} label="Mark Places of Interest">
      {isDestination ? (
        <span>A destination was selected</span>
      ) : isDone ? (
        list.map(({ id, name, path }, index) => (
          <span
            className={clsx(
              index !== list.length - 1 && 'after:content-[","] after:mr-1',
            )}
          >
            <Link key={id} href={path}>
              {name}
            </Link>
          </span>
        ))
      ) : (
        <span>
          Mark <Link href="/countries">countries</Link> or{' '}
          <Link href="/">cities</Link> of interest.
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

  const handleListClick = () => {
    storageService.setFilters('cities', {
      countries: JSON.stringify([destination]),
    });
    navigate('/');
  };

  const isDone = destination in City;

  return (
    <Item isDone={isDone} label="Choose Destination">
      {isDone ? (
        <Link href={`/city/${destination}`}>
          {cities?.[destination as City].name}
        </Link>
      ) : destination ? (
        <span>
          Only a destination country was set (
          <Link href={`/city/${destination}`}>
            {countries?.[destination as Country].name}
          </Link>
          ), choose a city from the <Link onClick={handleListClick}>list</Link>
        </span>
      ) : (
        <span>
          Choose destination from <Link href="/">cities</Link>
        </span>
      )}
    </Item>
  );
};

const ResearchItem = () => {
  const {
    group: { destination },
  } = useUserContext();
  const isDestination = destination in City;

  const { data: notes = 0 } = apiService.notes.useCount(
    destination,
    isDestination,
  );

  const isDone = isDestination && notes > 10;

  const link = `/city/${destination}/notes`;

  return (
    <Item isDone={isDone} label="Research Destination and Collect Notes">
      {isDone ? (
        <span>
          Added {notes.toLocaleString()} <Link href={link}>notes</Link>
        </span>
      ) : isDestination ? (
        <span>
          {notes === 1
            ? 'Added 1 note - add more'
            : notes > 0
              ? `Added ${notes.toLocaleString()} notes - add more`
              : 'Start adding'}{' '}
          <Link href={link}>notes</Link> to your destination
        </span>
      ) : (
        <span>No destination selected</span>
      )}
    </Item>
  );
};

export const ProgressWidget = () => {
  const theme = useTheme();

  return (
    <SectionCard
      style={{ background: getCardBg(theme), border: 'none' }}
      title="Progress"
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

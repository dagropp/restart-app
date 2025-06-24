import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import apiService, { CountryResponse } from '@services/api';
import titleService from '@services/title';
import { CountryImage } from '@shared/CountryDisplay';
import { Note } from '@shared/Notes';
import { format } from '@utils/format.utils';
import { list } from '@utils/list.utils';
import { useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router';

import { CityTabKey, CountryTabKey } from '../../../types';
import { useCountryContext } from '../context';
import CountryNotes from './CountryNotes';
import { CountryOverview } from './CountryOverview';

const routes = {
  [CountryTabKey.OVERVIEW]: {
    label: 'Overview',
    Component: CountryOverview,
  },
  [CountryTabKey.NOTES]: {
    label: 'Notes',
    Component: CountryNotes,
  },
  [CountryTabKey.NOTE]: {
    Component: Note,
  },
};

const keyMap: Record<string, string> = { overview: 'Overview', notes: 'Notes' };

interface Props {
  tab: CountryTabKey;
}

interface GeneralTabsProps {
  tab: CountryTabKey;
  notes?: number;
  item?: CountryResponse;
  loading: boolean;
}

export const GeneralTabs = ({
  notes = 0,
  item,
  tab,
  loading,
}: GeneralTabsProps) => {
  const { pathname } = useLocation();
  const { data: countries } = apiService.countries.useList();
  const [prevCountry, nextCountry] = list.getListNavigation<CountryResponse>(
    item,
    countries,
    (a, b) => a.name.localeCompare(b.name),
  );

  const key = pathname?.includes('overview') ? 'overview' : 'notes';

  const getPath = (path: CountryTabKey) => `/countries/${item?.id}/${path}`;

  useLayoutEffect(() => {
    const keyTitle = key ? keyMap[key] : '';
    titleService.setTitle(item?.name, keyTitle);
  }, [item?.name, key]);

  const { Component } = routes[tab];

  return (
    <>
      <MuiTabs
        value={key}
        className="sticky top-0 z-10 px-5"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        <MuiTab
          value={CountryTabKey.OVERVIEW}
          label={routes[CountryTabKey.OVERVIEW].label}
          component={Link}
          to={getPath(CountryTabKey.OVERVIEW)}
        />
        <MuiTab
          value={CityTabKey.NOTES}
          label={`${routes[CityTabKey.NOTES].label} (${format.shortNumber(notes, 1000)})`}
          component={Link}
          to={getPath(CountryTabKey.NOTES)}
        />
      </MuiTabs>
      <div className="pt-5">
        {item ? (
          <div className="flex pb-5 items-center justify-center gap-2">
            <Tooltip title={prevCountry?.name}>
              <IconButton
                size="small"
                component={Link}
                to={`/countries/${prevCountry?.id}`}
              >
                <ArrowLeftRoundedIcon />
              </IconButton>
            </Tooltip>
            <CountryImage country={item.id} className="h-14 mr-2" />
            <div className="flex flex-col">
              <Typography
                variant="h6"
                lineHeight="normal"
                className="!font-bold"
              >
                {item.name}
              </Typography>
            </div>
            <Tooltip title={nextCountry?.name}>
              <IconButton
                size="small"
                component={Link}
                to={`/countries/${nextCountry?.id}`}
              >
                <ArrowRightRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div className="flex pb-5 items-center justify-center gap-4">
            <Skeleton variant="rectangular" width={106} height={56} />
            <div className="flex flex-col">
              <Typography
                variant="h6"
                lineHeight="normal"
                className="!font-bold"
              >
                <Skeleton variant="text" width={90} />
              </Typography>
            </div>
          </div>
        )}
        <Component loading={loading} />
      </div>
    </>
  );
};

export const Tabs = ({ tab }: Props) => {
  const { item } = useCountryContext();

  const { data: notesCount } = apiService.notes.useCount(item.id);

  return (
    <GeneralTabs tab={tab} item={item} notes={notesCount} loading={false} />
  );
};

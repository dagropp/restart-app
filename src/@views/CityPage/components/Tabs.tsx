import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import apiService, { CityData } from '@services/api';
import titleService from '@services/title';
import { CountryImage } from '@shared/CountryDisplay';
import { Note } from '@shared/Notes';
import { interpolateTranslations, useTranslations } from '@translations';
import { format } from '@utils/format.utils';
import { list } from '@utils/list.utils';
import { useLayoutEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import { CityTabKey } from '../../../types';
import { useCityContext } from '../context';
import CityCompare from '../views/CityCompare';
import CityNotes from '../views/CityNotes';
import CityOverview from '../views/CityOverview';
import Cost from '../views/Cost';

interface Props {
  tab: CityTabKey;
}

interface GeneralTabsProps {
  tab: CityTabKey;
  item?: CityData;
  loading: boolean;
}

export const GeneralTabs = ({ item, tab, loading }: GeneralTabsProps) => {
  const { pathname } = useLocation();
  const { data: cities } = apiService.useCities();
  const { data: notes = [], refetch: refetchNotes } = apiService.notes.useNotes(
    { placeId: item?.id },
  );

  const [prevCity, nextCity] = list.getListNavigation<CityData>(
    item,
    cities,
    (a, b) => {
      const byCountry = a.country.name.localeCompare(b.country.name);
      const byCity = a.name.localeCompare(b.name);
      return byCountry || byCity;
    },
  );

  const translations = useTranslations().menu;

  const routes = {
    [CityTabKey.OVERVIEW]: {
      label: translations.tabs.overview,
      element: <CityOverview loading={loading} />,
    },
    [CityTabKey.COST]: {
      label: translations.tabs.simulation,
      element: <Cost loading={loading} />,
    },
    [CityTabKey.NOTES]: {
      label: translations.tabs.notes,
      element: (
        <CityNotes loading={loading} refetch={refetchNotes} notes={notes} />
      ),
    },
    [CityTabKey.NOTE]: {
      element: <Note loading={loading} />,
    },
    [CityTabKey.COMPARE]: {
      label: translations.primary.compare,
      element: <CityCompare loading={loading} />,
    },
  };

  const keyMap: Record<string, string> = useMemo(
    () => ({
      overview: translations.tabs.overview,
      cost: translations.tabs.simulation,
      notes: translations.primary.notes,
      compare: translations.primary.compare,
    }),
    [
      translations.primary.compare,
      translations.primary.notes,
      translations.tabs.overview,
      translations.tabs.simulation,
    ],
  );

  const key = pathname.includes('overview')
    ? 'overview'
    : pathname.includes('cost')
      ? 'cost'
      : pathname.includes('compare')
        ? 'compare'
        : 'notes';

  const getPath = (path: CityTabKey) => `/city/${item?.id}/${path}`;

  useLayoutEffect(() => {
    const keyTitle = key ? keyMap[key] : '';
    titleService.setTitle(item?.name, keyTitle);
  }, [item?.name, key, keyMap]);

  return (
    <>
      <MuiTabs
        value={key}
        className="sticky top-0 z-10 px-5"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        <MuiTab
          value={CityTabKey.OVERVIEW}
          label={routes[CityTabKey.OVERVIEW].label}
          component={Link}
          to={getPath(CityTabKey.OVERVIEW)}
        />
        <MuiTab
          value={CityTabKey.COST}
          label={routes[CityTabKey.COST].label}
          component={Link}
          to={getPath(CityTabKey.COST)}
        />
        <MuiTab
          value={CityTabKey.COMPARE}
          label={routes[CityTabKey.COMPARE].label}
          component={Link}
          to={getPath(CityTabKey.COMPARE)}
        />
        <MuiTab
          value={CityTabKey.NOTES}
          label={interpolateTranslations(routes[CityTabKey.NOTES].label, {
            notes: format.shortNumber(notes.length, 1000),
          })}
          component={Link}
          to={getPath(CityTabKey.NOTES)}
        />
      </MuiTabs>
      <div className="pt-5">
        {item ? (
          <div className="flex pb-5 items-center justify-center gap-2">
            <Tooltip title={prevCity?.name}>
              <IconButton
                size="small"
                component={Link}
                to={`/city/${prevCity?.id}`}
              >
                <ArrowLeftRoundedIcon />
              </IconButton>
            </Tooltip>
            <CountryImage country={item.country.id} className="h-14 mr-2" />
            <div className="flex flex-col">
              <Typography
                variant="h6"
                lineHeight="normal"
                className="!font-bold"
              >
                {item.name}
              </Typography>
              {item.state && (
                <Typography variant="subtitle2" className="!font-bold">
                  {item.state}
                </Typography>
              )}
              <Typography variant="subtitle2" className="!font-bold">
                {item.country.name}
              </Typography>
            </div>
            <Tooltip title={nextCity?.name}>
              <IconButton
                size="small"
                component={Link}
                to={`/city/${nextCity?.id}`}
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
              <Typography variant="subtitle2" className="!font-bold">
                <Skeleton variant="text" width={70} />
              </Typography>
              <Typography variant="subtitle2" className="!font-bold">
                <Skeleton variant="text" width={50} />
              </Typography>
            </div>
          </div>
        )}
        {routes[tab].element}
      </div>
    </>
  );
};

const Tabs = ({ tab }: Props) => {
  const { item } = useCityContext();

  return <GeneralTabs tab={tab} item={item} loading={false} />;
};

export default Tabs;

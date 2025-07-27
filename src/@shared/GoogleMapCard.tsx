import Skeleton from '@mui/material/Skeleton';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import apiService from '@services/api';
import { useTranslations } from '@translations';
import { is } from '@utils/is.utils';
import clsx from 'clsx';
import { memo, useState } from 'react';

import SectionCard from './SectionCard';

interface MapParams {
  place: string;
  destination?: string;
  airport?: string;
}

interface Props {
  params: MapParams;
  zoom?: number;
}

interface TabData {
  key: View;
  label: string;
  hidden?: boolean;
}

type View = 'PLACE' | 'AIRPORT' | 'METRO';

const ROOT = 'https://www.google.com/maps/embed/v1/';

const getUrl = (
  apiKey: string,
  params: MapParams,
  view: View,
  zoom?: number,
) => {
  const query: Record<string, string> = { key: apiKey };
  const api = view === 'PLACE' ? 'place' : 'directions';

  switch (view) {
    case 'PLACE':
      if (!is.nullOrUndefined(zoom)) query.zoom = zoom.toString();
      query.q = params.place;
      break;
    case 'METRO':
      query.origin = params.place;
      query.destination = params.destination ?? '';
      query.mode = 'transit';
      query.units = 'metric';
      break;
    case 'AIRPORT':
      query.origin = `${params.airport} Airport`;
      query.destination = params.place;
      query.mode = 'transit';
      query.units = 'metric';
      break;
  }
  const searchParams = new URLSearchParams(query).toString();
  return `${ROOT}${api}?${searchParams}`;
};

const GoogleMapCard = memo(
  ({ params, zoom }: Props) => {
    const translations = useTranslations().city.map;

    const [view, setView] = useState<View>(() =>
      params.destination ? 'METRO' : 'PLACE',
    );

    const apiKeyQuery = apiService.external.useMapsApiKey();

    const url =
      apiKeyQuery.data?.apiKey &&
      getUrl(apiKeyQuery.data.apiKey, params, view, zoom);

    const tabsData: TabData[] = [
      {
        key: 'PLACE',
        label: translations.city,
      },
      {
        key: 'METRO',
        label: translations.metropolitan,
        hidden: !params.destination,
      },
      {
        key: 'AIRPORT',
        label: translations.airport,
      },
    ];

    const isPlaceOnly = !params.destination && !params.airport;

    return (
      <SectionCard contentClassName={clsx(isPlaceOnly && '!p-0')}>
        {!isPlaceOnly && (
          <Tabs
            value={view}
            onChange={(_, value) => setView(value)}
            className="mb-2"
          >
            {tabsData
              .filter((tab) => !tab.hidden)
              .map(({ key, label }) => (
                <Tab key={key} value={key} label={label} />
              ))}
          </Tabs>
        )}
        <div className="relative w-full h-[300px]">
          {url && (
            <iframe
              referrerPolicy="no-referrer-when-downgrade"
              src={url}
              allowFullScreen
              className={clsx(
                'border-0 w-full h-full',
                !isPlaceOnly && 'rounded-lg overflow-hidden',
              )}
            />
          )}
          <Skeleton
            variant="rounded"
            className={clsx(
              'absolute inset-0 z-10',
              !apiKeyQuery.isLoading && 'invisible',
            )}
            height={300}
          />
        </div>
      </SectionCard>
    );
  },
  (prev, next) =>
    prev.params.place === next.params.place &&
    prev.params.airport === next.params.airport &&
    prev.params.destination === next.params.destination &&
    prev.zoom === next.zoom,
);

export default GoogleMapCard;

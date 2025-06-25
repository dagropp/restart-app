import { Tab, Tabs } from '@mui/material';
import { is } from '@utils/is.utils';
import clsx from 'clsx';
import { memo, useState } from 'react';

import SectionCard from './SectionCard';

const API_KEY = 'AIzaSyD9BbzQz7f9iADHjsvjtaLlWzB6WnFrfcg';

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

const getUrl = (params: MapParams, view: View, zoom?: number) => {
  const query: Record<string, string> = { key: API_KEY };
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
    const [view, setView] = useState<View>(() =>
      params.destination ? 'METRO' : 'PLACE',
    );
    const url = getUrl(params, view, zoom);

    const tabsData: TabData[] = [
      { key: 'PLACE', label: 'City' },
      { key: 'METRO', label: 'Metropolitan', hidden: !params.destination },
      { key: 'AIRPORT', label: 'Airport' },
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
        <iframe
          referrerPolicy="no-referrer-when-downgrade"
          src={url}
          allowFullScreen
          className={clsx(
            'border-0 w-full h-[300px]',
            !isPlaceOnly && 'rounded-lg overflow-hidden',
          )}
        ></iframe>
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

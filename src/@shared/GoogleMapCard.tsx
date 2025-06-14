import { is } from '@utils/is.utils';
import { memo } from 'react';

import SectionCard from './SectionCard';

const API_KEY = 'AIzaSyD9BbzQz7f9iADHjsvjtaLlWzB6WnFrfcg';

interface Props {
  query: string;
  zoom?: number;
}

const getUrl = (query: string, zoom?: number) => {
  const params: Record<string, string> = { key: API_KEY, q: query };
  if (!is.nullOrUndefined(zoom)) params.zoom = zoom.toString();
  const searchParams = new URLSearchParams(params).toString();
  return `https://www.google.com/maps/embed/v1/place?${searchParams}`;
};

const GoogleMapCard = memo(
  ({ query, zoom }: Props) => {
    const url = getUrl(query, zoom);

    return (
      <SectionCard contentClassName="!p-0">
        <iframe
          referrerPolicy="no-referrer-when-downgrade"
          src={url}
          allowFullScreen
          className="border-0 w-full h-[300px]"
        ></iframe>
      </SectionCard>
    );
  },
  (prev, next) => prev.query === next.query && prev.zoom === next.zoom,
);

export default GoogleMapCard;

import { memo, useRef } from 'react';

import { YouTubePlayerProps } from '../types';

export const YouTubePlayer = memo(
  ({ id, list, listType, fullPage }: YouTubePlayerProps) => {
    const ref = useRef<HTMLIFrameElement>(null);
    const width = (ref.current?.clientWidth ?? fullPage) ? 600 : 476;

    const url = new URL(`https://www.youtube.com/embed/${id}`);
    if (list) url.searchParams.set('list', list);
    if (listType) url.searchParams.set('listType', listType);

    return (
      <iframe
        className="w-full rounded-lg border-none max-w-[600px]"
        style={{ height: width * 0.56 }}
        src={url.toString()}
        allowFullScreen
        ref={ref}
      />
    );
  },
  (prev, next) =>
    prev.id === next.id &&
    prev.list === next.list &&
    prev.listType === next.listType,
);

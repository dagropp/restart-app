import { SpotifyPlayerProps } from '@shared/Notes/components/NoteLink/types';
import { memo } from 'react';

export const SpotifyPlayer = memo(
  ({ id, type, fullPage }: SpotifyPlayerProps) => (
    <iframe
      src={`https://open.spotify.com/embed/${type}/${id}?utm_source=generator`}
      allowFullScreen
      allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="border-none w-full max-w-[600px]"
      style={{ height: fullPage ? 500 : 152 }}
    />
  ),
  (prev, next) =>
    prev.id === next.id &&
    prev.type === next.type &&
    prev.fullPage === next.fullPage,
);

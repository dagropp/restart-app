export interface YouTubePlayerProps {
  id: string;
  list?: string;
  listType?: 'playlist';
  fullPage?: boolean;
}

export type SpotifyMediaType = 'album' | 'playlist' | 'track';

export interface SpotifyPlayerProps {
  id: string;
  type: SpotifyMediaType;
  fullPage?: boolean;
}

import {
  SpotifyMediaType,
  SpotifyPlayerProps,
  YouTubePlayerProps,
} from './types';

const YOUTUBE_URL = 'youtube.com';
const SPOTIFY_URL = 'spotify.com';

export const parseYouTubeLink = (url: string): YouTubePlayerProps | null => {
  if (!url?.includes(YOUTUBE_URL)) return null;

  const urlObject = new URL(url);
  const params = Object.fromEntries(urlObject.searchParams);
  if (!params?.v) return null;

  const { v: id, list } = params;
  return { id, list, listType: list ? 'playlist' : undefined };
};

export const parseSpotifyLink = (url: string): SpotifyPlayerProps | null => {
  if (!url?.includes(SPOTIFY_URL)) return null;

  const urlObject = new URL(url);
  const href = urlObject.href.replace(urlObject.search, '');
  const [type, id] = href.split('/').slice(-2);
  if (type && id) return { type: type as SpotifyMediaType, id };
  return null;
};

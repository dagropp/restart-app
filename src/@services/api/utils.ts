const API_ROOT = 'https://restart-server.onrender.com/api';

export const getUrl = (path: string, ...ids: (string | number | undefined)[]) =>
  [API_ROOT, path, ...ids].filter(Boolean).join('/');

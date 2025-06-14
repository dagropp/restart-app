const API_ROOT = 'http://localhost:3290/api';

export const getUrl = (path: string, ...ids: (string | number | undefined)[]) =>
  [API_ROOT, path, ...ids].filter(Boolean).join('/');

const API_ROOT = `${import.meta.env.VITE_SERVER_ROOT}/api`;

export const getUrl = (path: string, ...ids: (string | number | undefined)[]) =>
  [API_ROOT, path, ...ids].filter(Boolean).join('/');

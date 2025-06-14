import { url } from '@utils/url.utils';

import storageService from './storage';

const request = async <Res extends object>(
  path: string,
  options: RequestInit,
  useSid = true,
): Promise<Res> => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (useSid) {
    const { sessionId } = storageService.get('user');
    headers['x-sid'] = sessionId;
    if (!sessionId) {
      const params = new URLSearchParams(location.search);
      headers['x-token'] = String(params.get('token'));
      headers['x-email'] = String(params.get('email'));
    }
  }
  const response = await fetch(path, { ...options, headers });

  if (!response.ok) {
    throw new Error(`API request failed with status code ${response.status}`);
  }
  return await response.json();
};

const parseQueryUrl = <Req extends object>(
  path: string,
  params?: Req,
): string => {
  const query = params && url.createSearchParams(params);
  return query ? `${path}?${query}` : path;
};

const get = async <Res extends object, Req extends object = object>(
  path: string,
  params?: Req,
  useSid = true,
): Promise<Res> =>
  request<Res>(parseQueryUrl(path, params), { method: 'GET' }, useSid);

const post = async <Res extends object, Req extends object = object>(
  path: string,
  payload?: Req,
): Promise<Res> =>
  request<Res>(path, { method: 'POST', body: JSON.stringify(payload) });

const httpDelete = async <Res extends object, Req extends object = object>(
  path: string,
  params?: Req,
): Promise<Res> =>
  request<Res>(parseQueryUrl(path, params), { method: 'DELETE' });

const put = async <Res extends object, Req extends object = object>(
  path: string,
  payload?: Req,
): Promise<Res> =>
  request<Res>(path, { method: 'PUT', body: JSON.stringify(payload) });

const patch = async <Res extends object, Req extends object = object>(
  path: string,
  payload?: Req,
): Promise<Res> =>
  request<Res>(path, { method: 'PATCH', body: JSON.stringify(payload) });

export const http = { get, put, post, patch, delete: httpDelete };

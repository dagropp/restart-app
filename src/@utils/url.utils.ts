import { object } from './object.utils';

const createSearchParams = <T extends object>(params: T): string => {
  const result = {} as Record<keyof T, string>;
  for (const [key, value] of object.entries(params)) {
    if (value !== undefined && value !== null) result[key] = String(value);
  }
  return new URLSearchParams(result).toString();
};

export const url = { createSearchParams };

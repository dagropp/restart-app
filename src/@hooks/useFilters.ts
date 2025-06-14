import storageService from '@services/storage';
import { object } from '@utils/object.utils';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

const getStoredParams = (key: string) =>
  new URLSearchParams(storageService.get('filters')[key]);

const useFilters = <T extends object>(
  key: string,
  defaultValue: T,
  isFiltered?: (value: T, defaultValue: T) => boolean,
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useLayoutEffect(() => {
    const storedParams = getStoredParams(key);
    if (storedParams.size) setSearchParams(storedParams);
  }, [key]);

  const [filters, setFilters] = useState<T>(() => {
    const fromParams: Partial<T> = {};
    const storedParams = getStoredParams(key);
    const params = storedParams.size ? storedParams : searchParams;
    params.forEach((value, key) => {
      try {
        fromParams[key as keyof T] = JSON.parse(value);
      } catch {
        fromParams[key as keyof T] = String(value) as T[keyof T];
      }
    });
    return { ...defaultValue, ...fromParams };
  });

  const update = useCallback(
    (value: Partial<T>) => {
      setSearchParams((prev) => {
        object.entries(value).forEach(([key, value]) => {
          prev.set(String(key), JSON.stringify(value));
        });
        const update = new URLSearchParams(prev);
        storageService.setFilters(key, update);
        return update;
      });

      setFilters((prev) => ({ ...prev, ...value }));
    },
    [key, setSearchParams],
  );

  const reset = useCallback(() => {
    update(defaultValue);
  }, [defaultValue, update]);

  const isFilteredResult = useMemo(
    () => (isFiltered ? isFiltered(filters, defaultValue) : true),
    [defaultValue, filters, isFiltered],
  );

  return { filters, update, reset, isFiltered: isFilteredResult };
};

export default useFilters;

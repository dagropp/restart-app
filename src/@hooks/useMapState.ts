import { object } from '@utils/object.utils';
import { useCallback, useMemo, useState } from 'react';

const useMapState = <K extends string | number, V extends object>(
  defaultValue?: Record<K, V>,
) => {
  const [state, setState] = useState<Map<K, V>>(
    new Map<K, V>(defaultValue && object.entries(defaultValue)),
  );

  const remove = useCallback(
    (key: K) =>
      setState((prev) => {
        const update = new Map(prev);
        update.delete(key);
        return update;
      }),
    [],
  );

  const add = useCallback(
    (key: K, value: V) =>
      setState((prev) => {
        const update = new Map(prev);
        update.set(key, value);
        return update;
      }),
    [],
  );

  const update = useCallback(
    (key: K, value: Partial<V>) =>
      setState((prev) => {
        const update = new Map(prev);
        const newValue = { ...update.get(key), ...value };
        update.set(key, newValue as V);
        return update;
      }),
    [],
  );

  const reset = useCallback(
    () => setState(new Map<K, V>(defaultValue && object.entries(defaultValue))),
    [defaultValue],
  );

  const list = useMemo(() => Array.from(state), [state]);

  const get = useCallback((key: K) => state.get(key), [state]);

  return { add, remove, get, update, list, state, reset };
};

export default useMapState;

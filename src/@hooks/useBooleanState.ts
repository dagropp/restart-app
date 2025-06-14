import { is } from '@utils/is.utils.ts';
import { useCallback, useState } from 'react';

interface BooleanStateActions {
  setTrue: () => void;
  setFalse: () => void;
  toggle: (force?: boolean) => void;
}

const useBooleanState = (
  initialValue: boolean = false,
): [boolean, BooleanStateActions] => {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(
    (force?: boolean) =>
      setValue(is.nullOrUndefined(force) ? (prev) => !prev : force),
    [],
  );

  return [value, { setTrue, setFalse, toggle }];
};

export default useBooleanState;

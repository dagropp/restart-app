import { useEffect, useRef } from 'react';

type UsePrevValueCallback<T> = (prev: T, next: T) => void;

const usePrevValue = <T>(value: T, callback: UsePrevValueCallback<T>) => {
  const ref = useRef(value);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    callbackRef.current(ref.current, value);
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevValue;

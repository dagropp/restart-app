import { useCallback, useEffect, useRef, useState } from 'react';

interface Actions {
  start: () => void;
  stop: () => void;
}

const useInterval = (
  interval: number,
  callback: () => void,
  autoStart?: boolean,
): Actions => {
  const intervalRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);
  const [time, setTime] = useState<number | null>(autoStart ? interval : null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (time) {
      intervalRef.current = setInterval(() => callbackRef.current(), time);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time]);

  const start = useCallback(() => setTime(interval), [interval]);
  const stop = useCallback(() => setTime(null), []);

  return { start, stop };
};

export default useInterval;

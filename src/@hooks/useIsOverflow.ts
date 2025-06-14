import { useEffect, useRef, useState } from 'react';

export type OverflowDirection = 'x' | 'y';

const getIsOverflow = <T extends HTMLElement>(
  element: T | null,
  direction?: OverflowDirection,
) => {
  if (!element) return false;
  const isX = element.scrollWidth > element.offsetWidth;
  const isY = element.scrollHeight > element.offsetHeight;
  return direction === 'x' ? isX : direction === 'y' ? isY : isX || isY;
};

const useIsOverflow = <T extends HTMLElement>(
  direction?: OverflowDirection,
) => {
  const ref = useRef<T>(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    setIsOverflow(getIsOverflow(ref.current, direction));
  }, [direction, ref.current]);

  return { ref, isOverflow };
};

export default useIsOverflow;

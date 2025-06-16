type TailwindBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<TailwindBreakpoint, number> = {
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
  '2xl': 96,
};

const isMediaQuery = (breakpoint: TailwindBreakpoint) =>
  window.matchMedia(`(min-width: ${breakpoints[breakpoint]}rem)`).matches;

const isLargerThanPhone = isMediaQuery('sm');
const isLargerThanTablet = isMediaQuery('lg');
const isHoverSupported = window.matchMedia('(hover: hover)').matches;
const MASONRY_COLUMN_COUNT = isLargerThanTablet ? 3 : isLargerThanPhone ? 2 : 1;

export const style = {
  isMediaQuery,
  isHoverSupported,
  isLargerThanPhone,
  isLargerThanTablet,
  MASONRY_COLUMN_COUNT,
};

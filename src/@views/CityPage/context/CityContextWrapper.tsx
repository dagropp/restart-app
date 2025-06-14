import { CityContext } from './CityContext';
import { CityContextWrapperProps } from './types';

export const CityContextWrapper = ({
  value,
  children,
}: CityContextWrapperProps) => (
  <CityContext value={value}>{children}</CityContext>
);

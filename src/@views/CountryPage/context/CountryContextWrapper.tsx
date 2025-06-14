import { CountryContext } from './CountryContext';
import { CountryContextWrapperProps } from './types';

export const CountryContextWrapper = ({
  value,
  children,
}: CountryContextWrapperProps) => {
  return <CountryContext value={value}>{children}</CountryContext>;
};

import Typography from '@common/Typography';
import { Country } from '@root/types';
import apiService from '@services/api';
import clsx from 'clsx';
import { RefObject } from 'react';

interface Props {
  country: Country;
  className?: string;
}

interface CountryImageProps {
  country: Country;
  className?: string;
  ref?: RefObject<HTMLImageElement>;
}

export const CountryImage = ({
  country,
  className,
  ...props
}: CountryImageProps) => (
  <img
    src={`/assets/flags/${country}.svg`}
    alt={`${country} flag`}
    className={className}
    {...props}
  />
);

const CountryDisplay = ({ country, className }: Props) => {
  const { data } = apiService.countries.use();
  if (!data) return null;

  const { name } = data[country];
  return (
    <Typography
      variant="body2"
      className={clsx('flex items-center gap-2', className)}
    >
      <CountryImage country={country} className="h-4" />
      {name}
    </Typography>
  );
};

export default CountryDisplay;

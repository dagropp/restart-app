import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import { RefCountry } from '@root/types';
import { useTranslations } from '@translations';

import { useCityContext } from '../../../context';

interface OriginCountryDisplayProps {
  country: RefCountry;
}

const OriginCountryDisplay = ({ country }: OriginCountryDisplayProps) => {
  const { item } = useCityContext();
  const translations = useTranslations().enum.refCountry;

  const finalCountry =
    country === RefCountry.NATIVE ? item.country.id : country;

  return (
    <Tooltip title={translations[country]}>
      <img
        alt={translations[country]}
        src={`/assets/flags/${finalCountry}.svg`}
        className="h-4"
      />
    </Tooltip>
  );
};

export const OriginDisplay = () => {
  const translations = useTranslations().city.immigrants;
  const { item } = useCityContext();
  const { origins } = item.immigrants;
  const { palette } = useTheme();

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ borderColor: palette.divider }}
    >
      <Typography variant="body2" fontWeight={500}>
        {translations.origins}
      </Typography>
      {origins.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {origins.map((country) => (
            <OriginCountryDisplay key={country} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

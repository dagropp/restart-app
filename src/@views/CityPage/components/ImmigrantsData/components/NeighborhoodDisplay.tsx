import Link from '@common/Link';
import Typography from '@common/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslations } from '@translations';
import { string } from '@utils/string.utils';
import clsx from 'clsx';

import { useCityContext } from '../../../context';

const getLink = (cityName: string, neighborhood: string) => {
  const encoded = encodeURI(`${cityName},${neighborhood}`);
  return `https://www.google.com/maps?q=${encoded}`;
};

export const NeighborhoodDisplay = () => {
  const translations = useTranslations().city.immigrants;
  const { item } = useCityContext();
  const { neighborhoods } = item.immigrants;
  const { palette } = useTheme();

  if (!neighborhoods.length) return null;

  return (
    <div
      className="flex flex-col items-center gap-2 border-t mx-4 mt-2 pt-2"
      style={{ borderColor: palette.divider }}
    >
      <Typography variant="body2" fontWeight={500}>
        {translations.neighborhoods}
      </Typography>
      <Typography
        variant="body2"
        dir={string.containsHebrew(neighborhoods.toString()) ? 'rtl' : 'ltr'}
      >
        {neighborhoods.map((neighborhood, index) => (
          <span
            className={clsx(
              index !== neighborhoods.length - 1 &&
                'after:content-[","] after:me-1',
            )}
            key={neighborhood}
          >
            <Link
              href={getLink(item.name, neighborhood)}
              external
              externalIconHidden
            >
              {neighborhood}
            </Link>
          </span>
        ))}
      </Typography>
    </div>
  );
};

import CloneElement from '@common/CloneElement';
import Link from '@common/Link';
import Typography from '@common/Typography';
import Skeleton from '@mui/material/Skeleton';
import apiService from '@services/api';
import { useTranslations, useTranslationsContext } from '@translations';

import SectionCard from './SectionCard';

interface ImageData {
  path: string;
  ratio: number;
}

interface Props {
  wikipediaKey: string;
  showTitle?: boolean;
  image?: ImageData;
}

const WikiData = ({ wikipediaKey, image, showTitle }: Props) => {
  const translations = useTranslations().city.wiki;
  const { language, isRtl } = useTranslationsContext();

  const { data, isLoading } = apiService.wiki.useSummary(
    language,
    wikipediaKey,
  );

  return (
    <SectionCard
      media={image ? { src: image.path, height: 510 / image.ratio } : undefined}
    >
      {isLoading ? (
        <div>
          <Typography variant="body2">
            <CloneElement times={7}>
              <Skeleton variant="text" />
            </CloneElement>
          </Typography>
        </div>
      ) : data ? (
        <div className="flex flex-col gap-4">
          {showTitle && (
            <Typography variant="body1" dir={isRtl ? 'rtl' : 'ltr'}>
              <strong>{data.title}</strong>
            </Typography>
          )}
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: data.extract_html }}
            className="text-justify"
            dir={isRtl ? 'rtl' : 'ltr'}
          />
          <Link
            external
            href={data.content_urls.desktop.page}
            className="w-max"
          >
            <Typography variant="body2">{translations.wikipedia}</Typography>
          </Link>
        </div>
      ) : (
        <div>{translations.notAvailable}</div>
      )}
    </SectionCard>
  );
};

export default WikiData;

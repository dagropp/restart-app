import CloneElement from '@common/CloneElement';
import Link from '@common/Link';
import Typography from '@common/Typography';
import Skeleton from '@mui/material/Skeleton';
import apiService from '@services/api';

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
  const { data, isLoading } = apiService.wiki.useSummary(wikipediaKey);

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
            <Typography variant="body1">
              <strong>{data.title}</strong>
            </Typography>
          )}
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{ __html: data.extract_html }}
            className="text-justify"
          />
          <Link
            external
            href={data.content_urls.desktop.page}
            className="w-max"
          >
            <Typography variant="body2">Wikipedia</Typography>
          </Link>
        </div>
      ) : (
        <div>Not Available</div>
      )}
    </SectionCard>
  );
};

export default WikiData;

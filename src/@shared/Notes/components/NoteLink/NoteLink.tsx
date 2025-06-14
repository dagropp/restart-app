import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { CircularProgress, Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import apiService from '@services/api';
import { SpotifyPlayer } from '@shared/Notes/components/NoteLink/components/SpotifyPlayer.tsx';
import { useQuery } from '@tanstack/react-query';

import { YouTubePlayer } from './components';
import { parseSpotifyLink, parseYouTubeLink } from './utils';

interface Props {
  link: string;
  fullPage?: boolean;
}

const ellipsisClassName =
  'max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis';

const LinkDisplay = ({ link }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['linkMetadata', link],
    queryFn: () => apiService.getLinkMetadata(link),
    staleTime: Infinity,
  });
  const avatar = isLoading ? (
    <CircularProgress size={20} />
  ) : data?.icon ? (
    <img
      src={data.icon}
      alt="Icon"
      className="h-[40px] w-[40px] object-contain"
    />
  ) : (
    <PublicRoundedIcon />
  );

  const title = isLoading ? (
    <Skeleton variant="text" height={18} />
  ) : (
    data?.title
  );

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className="text-left"
    >
      <Card
        sx={{ ':hover': { bgcolor: (theme) => theme.palette.action.hover } }}
        variant="outlined"
      >
        <CardHeader
          avatar={avatar}
          title={title}
          subheader={link}
          slotProps={{
            content: { className: ellipsisClassName },
            title: { className: ellipsisClassName },
            subheader: { className: ellipsisClassName },
          }}
        />
      </Card>
    </a>
  );
};

export const NoteLink = ({ link, fullPage }: Props) => {
  const youTubePlayerProps = parseYouTubeLink(link);
  if (youTubePlayerProps)
    return <YouTubePlayer fullPage={fullPage} {...youTubePlayerProps} />;

  const spotifyPlayerProps = parseSpotifyLink(link);
  if (spotifyPlayerProps)
    return <SpotifyPlayer fullPage={fullPage} {...spotifyPlayerProps} />;

  return (
    <div className="max-w-[600px]">
      <LinkDisplay link={link} />
    </div>
  );
};

import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import apiService, { NoteResponse, NoteScope } from '@services/api';
import dateService from '@services/date.service';
import { useMemo } from 'react';

interface Props {
  note: NoteResponse;
  isReply: boolean;
  showCity?: boolean;
}

export const NoteCardSubheader = ({ note, isReply, showCity }: Props) => {
  const { data: cities } = apiService.useCities();

  const cityLink = useMemo(() => {
    if (cities && showCity && note.cityId) {
      const city = cities[note.cityId];
      return (
        <span className="before:content-['•'] before:mr-2">
          <Link href={`/city/${city.id}/notes`}>{city.name}</Link>
        </span>
      );
    }
  }, [cities, note.cityId, showCity]);

  const ScopeIcon =
    note.scope === NoteScope.Public ? PublicRoundedIcon : HttpsRoundedIcon;

  return (
    <div className="flex items-center gap-2">
      <Tooltip
        title={
          note.created !== note.updated &&
          `Created on ${dateService.formatDateTime(note.created)}`
        }
      >
        <span>{dateService.formatDateTime(note.updated)}</span>
      </Tooltip>
      {!isReply && (
        <span className="flex items-center gap-1 before:content-['•'] before:mr-1">
          <ScopeIcon fontSize="inherit" />
          {note.scope}
        </span>
      )}
      {cityLink}
    </div>
  );
};

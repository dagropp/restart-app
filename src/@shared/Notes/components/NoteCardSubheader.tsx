import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { NoteScope } from '@root/types';
import apiService, { NoteResponse } from '@services/api';
import dateService from '@services/date.service';
import { useMemo } from 'react';

interface Props {
  note: NoteResponse;
  isReply: boolean;
  showCity?: boolean;
}

export const NoteCardSubheader = ({ note, isReply, showCity }: Props) => {
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();

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

  const countryLink = useMemo(() => {
    if (countries && note.countryId && !note.cityId && !showCity) {
      const country = countries[note.countryId];
      return (
        <span className="block mt-1">
          General note for{' '}
          <Link href={`/countries/${country.id}/notes`}>{country.name}</Link>
        </span>
      );
    }
  }, [countries, note.cityId, note.countryId, showCity]);

  const ScopeIcon =
    note.scope === NoteScope.Public ? PublicRoundedIcon : HttpsRoundedIcon;

  return (
    <div>
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
      {countryLink}
    </div>
  );
};

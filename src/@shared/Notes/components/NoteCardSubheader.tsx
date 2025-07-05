import Link from '@common/Link';
import Tooltip from '@common/Tooltip';
import Typography from '@common/Typography';
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { NoteScope } from '@root/types';
import apiService, { NoteResponse } from '@services/api';
import dateService from '@services/date.service';
import {
  interpolateTranslations,
  useTranslations,
  useTranslationsContext,
} from '@translations';
import { useMemo } from 'react';

interface Props {
  note: NoteResponse;
  isReply: boolean;
  showCity?: boolean;
}

export const NoteCardSubheader = ({ note, isReply, showCity }: Props) => {
  const { data: cities } = apiService.useCities();
  const { data: countries } = apiService.countries.useList();
  const { isRtl } = useTranslationsContext();
  const translations = useTranslations();
  const compTranslations = translations.notes;

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
        <Typography variant="body2" dir={isRtl ? 'rtl' : 'ltr'} align="left">
          <span className="block mt-1">
            {compTranslations.generalNote}
            <Link href={`/countries/${country.id}/notes`}>{country.name}</Link>
          </span>
        </Typography>
      );
    }
  }, [
    countries,
    note.cityId,
    note.countryId,
    showCity,
    compTranslations.generalNote,
  ]);

  const ScopeIcon =
    note.scope === NoteScope.Public ? PublicRoundedIcon : HttpsRoundedIcon;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Tooltip
          title={
            note.created !== note.updated &&
            interpolateTranslations(compTranslations.createdOn, {
              date: dateService.formatDateTime(note.created),
            })
          }
        >
          <span>{dateService.formatDateTime(note.updated)}</span>
        </Tooltip>
        {!isReply && (
          <span className="flex items-center gap-1 before:content-['•'] before:mr-1">
            <ScopeIcon fontSize="inherit" />
            {translations.enum.noteScope[note.scope]}
          </span>
        )}
        {cityLink}
      </div>
      {countryLink}
    </div>
  );
};

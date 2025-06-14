import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import IconButton from '@mui/material/IconButton';
import apiService, { City, Country } from '@services/api';
import { NoteCard } from '@shared/Notes/components';
import { useLocation, useNavigate, useParams } from 'react-router';

import { useNoteId } from './useNoteId';

interface NoteWithDataProps {
  loading?: false;
  showCity?: boolean;
}

type Props = { loading: true } | NoteWithDataProps;

const NoteWithData = ({ showCity }: NoteWithDataProps) => {
  const noteId = useNoteId();
  const { id: placeId } = useParams<{ id: City | Country }>();

  const { notes, actions } = apiService.notes.useNotes({ noteId, placeId });

  const note = notes[0];

  if (!note) return null;

  return (
    <NoteCard note={note} actions={actions} showCity={showCity} fullPage />
  );
};

export const Note = (props: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const back = () => {
    const url = pathname?.split('/').slice(0, -1).join('/');
    navigate(url);
  };

  return (
    <div className="px-5">
      <IconButton onClick={back} className="!mt-4">
        <ChevronLeftRoundedIcon />
      </IconButton>

      {!props.loading && <NoteWithData {...props} />}
    </div>
  );
};

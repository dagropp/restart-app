import Masonry from '@mui/lab/Masonry';
import { City, Country, NoteScope } from '@root/types';
import apiService, { NoteResponse, UseNotesActions } from '@services/api';
import { style } from '@utils/style.utils';

import {
  NoteCard,
  NoteCardSkeleton,
  type NoteData,
  NoteEditor,
  NoteForm,
} from './components';

interface Props {
  notes?: NoteResponse[];
  actions?: UseNotesActions;
  id?: Country | City;
  showCity?: boolean;
  loading: boolean;
}

interface NotesWithDataProps extends Required<Omit<Props, 'loading' | 'id'>> {
  id?: Country | City;
}

const NotesWithData = ({
  notes,
  id,
  actions,
  showCity,
}: NotesWithDataProps) => {
  const handleSave = async ({ note, scope, type, title }: NoteData) => {
    const noteScope = scope ? NoteScope.Private : NoteScope.Public;
    const response = await apiService.notes.add(
      id,
      noteScope,
      note,
      type,
      title,
    );
    if (response) actions.add(response);
  };

  return (
    <>
      <div className="my-2">
        <Masonry columns={style.MASONRY_COLUMN_COUNT} spacing={2} sequential>
          <div className="invisible">|</div>
          <NoteForm onSave={handleSave} className="flex flex-col gap-4">
            <NoteEditor
              variant="add"
              placeId={id}
              actions={actions}
              autoFocus
            />
          </NoteForm>
          <div className="invisible">|</div>
        </Masonry>
      </div>

      <Masonry columns={style.MASONRY_COLUMN_COUNT} spacing={2} sequential>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            actions={actions}
            showCity={showCity}
          />
        ))}
      </Masonry>
    </>
  );
};

const NotesSkeleton = () => {
  const rows = [5, 3, 4, 2, 3, 5, 3, 2];

  return (
    <Masonry columns={style.MASONRY_COLUMN_COUNT} spacing={2}>
      <NoteForm
        onSave={async () => console.log()}
        className="flex flex-col gap-4 w-full"
      >
        <NoteEditor disabled actions={{} as UseNotesActions} variant="add" />
      </NoteForm>
      {rows.map((rows, index) => (
        <NoteCardSkeleton rows={rows} key={index} />
      ))}
    </Masonry>
  );
};

const Notes = ({ loading, id, notes, actions, showCity = false }: Props) => (
  <div className="pl-5">
    {loading || !notes || !actions ? (
      <NotesSkeleton />
    ) : (
      <NotesWithData
        id={id}
        notes={notes}
        actions={actions}
        showCity={showCity}
      />
    )}
  </div>
);

export default Notes;

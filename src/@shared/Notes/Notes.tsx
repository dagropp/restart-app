import Masonry from '@mui/lab/Masonry';
import { City, Country, NoteScope } from '@root/types';
import apiService, { NoteResponse } from '@services/api';
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
  refetch?: () => void;
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
  refetch,
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
    if (response) refetch();
  };

  return (
    <>
      <div className="my-2">
        <Masonry columns={style.MASONRY_COLUMN_COUNT} spacing={2} sequential>
          <div className="invisible">|</div>
          <NoteForm onSave={handleSave} className="flex flex-col gap-4">
            <NoteEditor variant="add" autoFocus />
          </NoteForm>
          <div className="invisible">|</div>
        </Masonry>
      </div>

      <Masonry columns={style.MASONRY_COLUMN_COUNT} spacing={2} sequential>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            refetch={refetch}
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
        <NoteEditor disabled variant="add" />
      </NoteForm>
      {rows.map((rows, index) => (
        <NoteCardSkeleton rows={rows} key={index} />
      ))}
    </Masonry>
  );
};

const Notes = ({ loading, id, notes, refetch, showCity = false }: Props) => (
  <div className="pl-5">
    {loading || !notes || !refetch ? (
      <NotesSkeleton />
    ) : (
      <NotesWithData
        id={id}
        notes={notes}
        refetch={refetch}
        showCity={showCity}
      />
    )}
  </div>
);

export default Notes;

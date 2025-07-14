import { type NoteResponse } from '@services/api';
import Notes from '@shared/Notes';

import { useCityContext } from '../context';

interface Props {
  loading: boolean;
  notes: NoteResponse[];
  refetch: () => void;
}

const NotesWithData = ({ notes, refetch }: Omit<Props, 'loading'>) => {
  const { item } = useCityContext();

  return <Notes loading={false} id={item.id} notes={notes} refetch={refetch} />;
};

const NotesSkeleton = () => <Notes loading={true} />;

const CityNotes = ({ loading, notes, refetch }: Props) =>
  loading ? (
    <NotesSkeleton />
  ) : (
    <NotesWithData notes={notes} refetch={refetch} />
  );

export default CityNotes;

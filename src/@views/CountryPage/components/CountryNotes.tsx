import { type NoteResponse } from '@services/api';
import Notes from '@shared/Notes';

import { useCountryContext } from '../context';

interface Props {
  loading: boolean;
  notes: NoteResponse[];
  refetch: () => void;
}

const NotesWithData = ({ notes, refetch }: Omit<Props, 'loading'>) => {
  const { item } = useCountryContext();

  return (
    <Notes
      loading={false}
      id={item.id}
      notes={notes}
      refetch={refetch}
      showCity
    />
  );
};

const NotesSkeleton = () => <Notes loading={true} />;

const CountryNotes = ({ loading, notes, refetch }: Props) =>
  loading ? (
    <NotesSkeleton />
  ) : (
    <NotesWithData notes={notes} refetch={refetch} />
  );

export default CountryNotes;

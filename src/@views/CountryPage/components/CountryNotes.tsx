import apiService from '@services/api';
import Notes from '@shared/Notes';

import { useCountryContext } from '../context';

interface Props {
  loading: boolean;
}

const NotesWithData = () => {
  const { item } = useCountryContext();

  const { notes, actions } = apiService.notes.useNotes({ placeId: item.id });

  return (
    <Notes
      loading={false}
      id={item.id}
      notes={notes}
      actions={actions}
      showCity
    />
  );
};

const NotesSkeleton = () => <Notes loading={true} />;

const CountryNotes = ({ loading }: Props) =>
  loading ? <NotesSkeleton /> : <NotesWithData />;

export default CountryNotes;

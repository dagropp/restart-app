import apiService from '@services/api';
import Notes from '@shared/Notes';

import { useCityContext } from '../context';

interface Props {
  loading: boolean;
}

const NotesWithData = () => {
  const { item } = useCityContext();

  const { actions, notes } = apiService.notes.useNotes({ placeId: item.id });

  return <Notes loading={false} id={item.id} notes={notes} actions={actions} />;
};

const NotesSkeleton = () => <Notes loading={true} />;

const CityNotes = ({ loading }: Props) =>
  loading ? <NotesSkeleton /> : <NotesWithData />;

export default CityNotes;

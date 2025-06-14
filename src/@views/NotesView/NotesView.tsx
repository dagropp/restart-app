import apiService from '@services/api';
import Notes from '@shared/Notes';

const NotesView = () => {
  const { query, notes, actions } = apiService.notes.useNotes();

  return (
    <div className="py-5">
      <Notes loading={query.isLoading} notes={notes} actions={actions} />
    </div>
  );
};

export default NotesView;

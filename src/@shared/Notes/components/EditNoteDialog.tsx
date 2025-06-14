import Button from '@common/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiService, {
  City,
  Country,
  type NoteResponse,
  NoteType,
  UseNotesActions,
} from '@services/api';

import { NoteEditor } from './NoteEditor';
import { type NoteData, NoteForm } from './NoteForm';

interface Props {
  open: boolean;
  onClose: () => void;
  note: NoteResponse;
  actions: UseNotesActions;
  placeId?: City | Country;
}

export const EditNoteDialog = ({
  open,
  onClose,
  note,
  actions,
  placeId,
}: Props) => {
  const dialogTitle = note.parent
    ? 'Edit Reply'
    : note.type === NoteType.Note
      ? 'Edit Note'
      : note.type === NoteType.Todo
        ? 'Edit Checklist'
        : 'Edit Link';

  const handleSave = async ({ note: value, title }: NoteData) => {
    const response = await apiService.notes.edit(note.id, value, title);
    if (response) actions.update(response);
    onClose();
  };

  return (
    <MuiDialog open={open} onClose={onClose} aria-hidden={!open}>
      <NoteForm
        onSave={handleSave}
        className="w-[600px] max-w-full"
        note={note}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <div className="pt-2">
            <NoteEditor
              note={note}
              variant="edit"
              maxRows={20}
              placeId={placeId}
              actions={actions}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </NoteForm>
    </MuiDialog>
  );
};

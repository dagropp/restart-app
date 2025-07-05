import Button from '@common/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { City, Country, NoteType } from '@root/types';
import apiService, { type NoteResponse, UseNotesActions } from '@services/api';
import { useTranslations } from '@translations';

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
  const translations = useTranslations();
  const compTranslations = translations.notes;

  const dialogTitle = note.parent
    ? compTranslations.edit.reply
    : note.type === NoteType.Note
      ? compTranslations.edit.note
      : note.type === NoteType.Todo
        ? compTranslations.edit.checklist
        : compTranslations.edit.link;

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
            {translations.common.cancel}
          </Button>
          <Button variant="contained" type="submit">
            {translations.common.save}
          </Button>
        </DialogActions>
      </NoteForm>
    </MuiDialog>
  );
};

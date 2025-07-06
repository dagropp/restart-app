import Dialog from '@common/Dialog';
import TextField from '@common/TextField';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const SaveSimulationDialog = ({ open, onClose, onSave }: Props) => {
  const [name, setName] = useState('');

  const handleClose = () => {
    setName('');
    onClose();
  };

  const handleSave = () => {
    onSave(name);
    handleClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      success={{ onAction: handleSave }}
      cancel={{ onAction: handleClose }}
    >
      <TextField
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Simulation Name"
        label="Simulation Name"
        className="!min-w-60"
      />
    </Dialog>
  );
};

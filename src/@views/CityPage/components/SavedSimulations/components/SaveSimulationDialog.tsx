import Dialog from '@common/Dialog';
import TextField from '@common/TextField';
import { useTranslations } from '@translations';
import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const SaveSimulationDialog = ({ open, onClose, onSave }: Props) => {
  const [name, setName] = useState('');
  const translations = useTranslations().city.cost.simulation.savedSimulations;

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
        placeholder={translations.name}
        label={translations.name}
        className="!min-w-60"
      />
    </Dialog>
  );
};

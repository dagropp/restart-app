import Typography from '@common/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import apiService, { ChecklistItem } from '@services/api';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from '@translations';
import { useState } from 'react';

interface Props {
  disabled?: boolean;
  setDone: (value: ChecklistItem[]) => void;
  setTodo: (value: ChecklistItem[]) => void;
  hasDoneItems: boolean;
}

export const ChecklistMenu = ({
  disabled,
  setDone,
  setTodo,
  hasDoneItems,
}: Props) => {
  const translations = useTranslations().notes;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const deleteChecked = useMutation({
    mutationKey: ['deleteChecklistChecked'],
    mutationFn: () => apiService.checklist.deleteChecked(),
    onMutate: () => setDone([]),
  });

  const deleteAll = useMutation({
    mutationKey: ['deleteChecklistAll'],
    mutationFn: () => apiService.checklist.deleteAll(),
    onMutate: () => {
      setDone([]);
      setTodo([]);
    },
  });

  const handleAction = (action: () => void) => () => {
    setAnchorEl(null);
    action();
  };

  const menuItems = [
    {
      key: 'deleteChecked',
      label: translations.deleteChecklistChecked,
      action: handleAction(deleteChecked.mutate),
      disabled: !hasDoneItems,
    },
    {
      key: 'deleteAll',
      label: translations.deleteAllChecklist,
      action: handleAction(deleteAll.mutate),
    },
  ];

  return (
    <>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        size="small"
        disabled={disabled || deleteChecked.isPending || deleteAll.isPending}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 48, horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {menuItems.map(({ key, label, action, disabled }) => (
          <MenuItem key={key} onClick={action} disabled={disabled}>
            <div className="flex items-center justify-between gap-4 w-full">
              <Typography variant="body2">{label}</Typography>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

import TextField from '@common/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import apiService from '@services/api';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import debounce from 'lodash.debounce';
import { ChangeEvent, KeyboardEvent, useId, useMemo } from 'react';

import { ChecklistItemProps } from '../types';
import { getClosestInput } from '../utils';

export const Item = ({
  item,
  isDone,
  setThis,
  setOther,
  createInputElement,
}: ChecklistItemProps) => {
  const elementId = useId();

  const updateText = useMutation({
    mutationKey: ['updateChecklistItemText', item, isDone],
    mutationFn: (text: string) =>
      apiService.checklist.put(item.id, {
        ...item,
        status: isDone,
        text,
        type: 'update',
      }),
  });

  const updateStatus = useMutation({
    mutationKey: ['updateChecklistItemStatus', item],
    mutationFn: (status: boolean) =>
      apiService.checklist.put(item.id, { ...item, status, type: 'status' }),
    onMutate: () => {
      setThis((prev) => prev.filter(({ id }) => id !== item.id));
      setOther((prev) => [item, ...prev]);
    },
  });

  const deleteItem = useMutation({
    mutationKey: ['deleteChecklistItem', item.id],
    mutationFn: () => apiService.checklist.deleteItem(item.id),
    onMutate: () => setThis((prev) => prev.filter(({ id }) => id !== item.id)),
  });

  const debouncedMutate = useMemo(
    () => debounce(updateText.mutate, 500),
    [updateText.mutate],
  );

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setThis((prev) => prev.map((i) => (i.id === item.id ? { ...i, text } : i)));
    debouncedMutate(text);
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;
      if (!input?.value) {
        debouncedMutate.cancel();
        const closestInput = getClosestInput(
          input,
          elementId,
          createInputElement,
        );
        if (closestInput) closestInput.focus();
        await deleteItem.mutateAsync();
      }
    }
  };

  return (
    <div className="flex gap-2 items-center group" id={elementId}>
      <Checkbox
        checked={isDone}
        onChange={(_, value) => updateStatus.mutate(value)}
        size="small"
      />
      <TextField
        variant="standard"
        className={clsx(isDone && 'line-through')}
        value={item.text}
        onChange={handleUpdate}
        onKeyDown={handleKeyDown}
        fullWidth
      />
      <IconButton
        size="small"
        onClick={() => deleteItem.mutate()}
        className="opacity-0 transition-opacity group-hover:opacity-100"
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

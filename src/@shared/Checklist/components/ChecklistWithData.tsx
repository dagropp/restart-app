import TextField from '@common/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import apiService, {
  type ChecklistItem,
  ChecklistItemSeverity,
} from '@services/api';
import { useTranslations } from '@translations';
import { string } from '@utils/string.utils';
import clsx from 'clsx';
import { type KeyboardEvent, useRef, useState } from 'react';

import { type ChecklistWithDataProps } from '../types';
import { ChecklistMenu } from './ChecklistMenu';
import { Item } from './Item';

export const ChecklistWithData = ({ data }: ChecklistWithDataProps) => {
  const [newValue, setNewValue] = useState('');
  const [done, setDone] = useState(data.done);
  const [todo, setTodo] = useState(data.todo);
  const translations = useTranslations().notes;
  const theme = useTheme();
  const createInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = async () => {
    const id = crypto.randomUUID();
    const item: ChecklistItem = {
      id: id,
      severity: ChecklistItemSeverity.Low,
      text: newValue,
    };
    setNewValue('');
    setTodo((prev) => [item, ...prev]);
    await apiService.checklist.put(id, {
      status: false,
      text: item.text,
      severity: item.severity,
      type: 'add',
    });
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const element = event.target as HTMLInputElement;
      if (!string.isEmpty(element?.value)) await handleAdd();
    }
  };

  return (
    <div className="max-w-[600px] mx-auto flex items-start pt-2">
      <div className="flex-1">
        <div className="flex gap-2 items-center pb-4">
          <TextField
            variant="standard"
            autoFocus
            fullWidth
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            placeholder={translations.add.todoItem}
            onKeyDown={handleKeyDown}
            ref={createInputRef}
          />
          <IconButton
            size="small"
            disabled={string.isEmpty(newValue)}
            onClick={handleAdd}
          >
            <AddRoundedIcon />
          </IconButton>
        </div>
        <div className="flex flex-col gap-3">
          {todo.length > 0 && (
            <div
              className={clsx(done.length > 0 && 'border-b pb-5')}
              style={{ borderColor: theme.palette.divider }}
            >
              {todo.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  isDone={false}
                  setThis={setTodo}
                  setOther={setDone}
                  createInputElement={createInputRef.current}
                />
              ))}
            </div>
          )}
          {done.length > 0 && (
            <div>
              {done.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  isDone={true}
                  setThis={setDone}
                  setOther={setTodo}
                  createInputElement={createInputRef.current}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ChecklistMenu
        setDone={setDone}
        setTodo={setTodo}
        disabled={!todo.length && !done.length}
        hasDoneItems={done.length > 0}
      />
    </div>
  );
};

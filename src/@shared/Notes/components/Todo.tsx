import TextField from '@common/TextField';
import Typography from '@common/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { City, Country, NoteScope, NoteType } from '@root/types';
import apiService, { NoteResponse, UseNotesActions } from '@services/api';
import { NoteData } from '@shared/Notes/components/NoteForm';
import { useMutation } from '@tanstack/react-query';
import { is } from '@utils/is.utils';
import clsx from 'clsx';
import { type KeyboardEvent, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  note?: NoteResponse;
  placeId?: City | Country;
  actions: UseNotesActions;
  title?: string;
  scope: boolean;
}

interface ItemProps {
  content: string;
  isDone: boolean;
  onCheckboxChange: (checked: boolean) => void;
  onContentChange: (value: string) => void;
  onDelete: () => void;
  disabled: boolean;
}

interface TodoItem {
  key: string;
  value: string;
}

interface TodoList {
  todo: TodoItem[];
  done: TodoItem[];
}

const defaultList: TodoList = { todo: [], done: [] };

const isResultTodoList = (value: unknown): value is TodoList =>
  is.object(value) &&
  'todo' in value &&
  'done' in value &&
  Array.isArray(value.todo) &&
  Array.isArray(value.done);

const getInitialValue = (setError: (value: string) => void, data?: string) => {
  if (!data) return defaultList;
  try {
    const result = JSON.parse(data);
    if (!isResultTodoList(result)) throw new Error();
    return result;
  } catch {
    setError('Data is corrupted');
    return defaultList;
  }
};

const Item = ({
  content,
  isDone,
  onCheckboxChange,
  onContentChange,
  onDelete,
  disabled,
}: ItemProps) => {
  return (
    <div className="flex gap-2 items-center group">
      <Checkbox
        checked={isDone}
        onChange={(_, value) => onCheckboxChange(value)}
        size="small"
        disabled={disabled}
      />
      <TextField
        variant="standard"
        className={clsx(isDone && 'line-through')}
        value={content}
        onChange={(event) => onContentChange(event.target.value)}
        fullWidth
        disabled={disabled}
      />
      <IconButton
        size="small"
        onClick={onDelete}
        className="opacity-0 transition-opacity group-hover:opacity-100"
        disabled={disabled}
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export const Todo = ({ note, placeId, actions, title, scope }: Props) => {
  const [error, setError] = useState('');
  const initialValue = useMemo(
    () => getInitialValue(setError, note?.data),
    [note?.data],
  );
  const [list, setList] = useState<TodoList>(initialValue);
  const [newValue, setNewValue] = useState('');

  const theme = useTheme();

  const formContext = useFormContext<NoteData>();

  const updateNote = useMutation({
    mutationKey: ['updateTodoNote', title, scope, note?.id, placeId],
    mutationFn: async (data: TodoList) => {
      const update = JSON.stringify(data);
      if (note?.id) {
        return apiService.notes.edit(note.id, update, title);
      } else {
        const noteScope = scope ? NoteScope.Private : NoteScope.Public;
        return apiService.notes.add(
          placeId,
          noteScope,
          update,
          NoteType.Todo,
          title,
        );
      }
    },
    onMutate: (data) => {
      if (note?.id) {
        const response = { ...note, note: data };
        actions.update(response);
      }
      setList(data);
    },
    onSuccess: (response) => {
      if (!note?.id) {
        actions.add(response);
        formContext?.reset?.();
      }
    },
  });

  const handleAdd = async () => {
    const update = {
      ...list,
      todo: [{ key: crypto.randomUUID(), value: newValue }, ...list.todo],
    };
    await updateNote.mutateAsync(update);
    setNewValue('');
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') await handleAdd();
  };

  const handleCheckboxChange = (item: TodoItem) => async (value: boolean) => {
    const toAdd: keyof TodoList = value ? 'done' : 'todo';
    const toClear: keyof TodoList = value ? 'todo' : 'done';
    const update = {
      ...list,
      [toClear]: list[toClear].filter(({ key }) => key !== item.key),
      [toAdd]: [item, ...list[toAdd]],
    };
    await updateNote.mutateAsync(update);
  };

  const handleDelete = (field: keyof TodoList, key: string) => async () => {
    const update = {
      ...list,
      [field]: list[field].filter((item) => item.key !== key),
    };
    await updateNote.mutateAsync(update);
  };

  const handleContentChange =
    (field: keyof TodoList, key: string) => async (value: string) => {
      const update = {
        ...list,
        [field]: list[field].map((item) =>
          item.key === key ? { ...item, value } : item,
        ),
      };
      await updateNote.mutateAsync(update);
    };

  const isDisabled = updateNote.isPending;

  return (
    <div
      className={clsx(
        'max-w-[600px]',
        (list.todo.length || list.done.length) && 'pb-4',
      )}
    >
      <div className="flex gap-2 items-center pb-4 pt-2">
        <TextField
          variant="standard"
          autoFocus
          fullWidth
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
          placeholder="Add Item..."
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
        />
        <IconButton
          size="small"
          disabled={!newValue || isDisabled}
          onClick={handleAdd}
        >
          <AddRoundedIcon />
        </IconButton>
      </div>
      <div className="flex flex-col gap-3">
        {list.todo.length > 0 && (
          <div
            className={clsx(list.done.length > 0 && 'border-b pb-5')}
            style={{ borderColor: theme.palette.divider }}
          >
            {list.todo.map((item) => (
              <Item
                key={item.key}
                content={item.value}
                isDone={false}
                onCheckboxChange={handleCheckboxChange(item)}
                onContentChange={handleContentChange('todo', item.key)}
                onDelete={handleDelete('todo', item.key)}
                disabled={isDisabled}
              />
            ))}
          </div>
        )}
        {list.done.length > 0 && (
          <div>
            {list.done.map((item) => (
              <Item
                key={item.key}
                content={item.value}
                isDone={true}
                onCheckboxChange={handleCheckboxChange(item)}
                onContentChange={handleContentChange('done', item.key)}
                onDelete={handleDelete('done', item.key)}
                disabled={isDisabled}
              />
            ))}
          </div>
        )}
      </div>
      {error && (
        <Typography variant="caption" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
};

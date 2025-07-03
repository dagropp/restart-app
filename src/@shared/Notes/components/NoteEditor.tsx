import { FormInput, FormTextField } from '@common/Form';
import Tooltip from '@common/Tooltip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import { City, Country, NoteType } from '@root/types';
import { NoteResponse, UseNotesActions } from '@services/api';
import { NoteData } from '@shared/Notes/components/NoteForm';
import { NoteTypeToggle } from '@shared/Notes/components/NoteTypeToggle';
import { Todo } from '@shared/Notes/components/Todo';
import { string } from '@utils/string.utils';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ScopeSwitch } from './ScopeSwitch';

type EditorVariant = 'add' | 'edit' | 'reply';

interface Props
  extends Omit<
    TextFieldProps,
    | 'onChange'
    | 'fullWidth'
    | 'name'
    | 'variant'
    | 'multiline'
    | 'defaultValue'
    | 'placeholder'
  > {
  note?: NoteResponse;
  variant: EditorVariant;
  placeId?: City | Country;
  actions: UseNotesActions;
}

const isValidUrl = (value: string) =>
  !value ||
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/.test(value);

const getPlaceholder = (variant: EditorVariant, type: NoteType): string => {
  switch (type) {
    case NoteType.Note:
      return variant === 'reply' ? 'Add Comment...' : 'Add a Note...';
    case NoteType.Link:
      return variant === 'reply' ? '' : 'Add a Link...';
    case NoteType.Todo:
      return variant === 'add' ? 'Add a Checklist...' : '';
  }
};

const getSpacingClass = (variant: EditorVariant): string => {
  switch (variant) {
    case 'add':
      return '!py-14';
    case 'reply':
      return '!pb-14';
    default:
      return '!pt-14';
  }
};

export const NoteEditor = ({
  minRows,
  sx = {},
  slotProps = { input: {} },
  autoFocus = true,
  disabled,
  variant,
  note,
  placeId,
  actions,
  ...props
}: Props) => {
  const { watch, setValue } = useFormContext<NoteData>();

  const [value, title, scope, type] = watch(['note', 'title', 'scope', 'type']);

  useEffect(() => {
    if (note) {
      setValue('title', note.title ?? '');
      setValue('note', note.data);
    }
  }, [note, setValue]);

  const isRtl = string.containsHebrew(value);
  const isNew = variant === 'add';
  const isEdit = variant === 'edit';
  const isEmpty = !value?.trim();
  const isError = !isEmpty && type === NoteType.Link && !isValidUrl(value);
  const isTextual = type === NoteType.Note || type === NoteType.Link;

  const placeholder = getPlaceholder(variant, type);

  return (
    <div className="relative" key={type}>
      {(variant === 'add' || variant === 'edit') && (
        <FormTextField<NoteData>
          variant="standard"
          placeholder="Add Title..."
          className="!absolute top-0 z-10 !px-3.5 !pt-3"
          fullWidth
          name="title"
          size="small"
          sx={
            string.containsHebrew(title)
              ? { textAlign: 'right', direction: 'rtl' }
              : {}
          }
        />
      )}
      {isTextual && (
        <FormTextField<NoteData>
          multiline
          name="note"
          variant="outlined"
          fullWidth
          minRows={minRows}
          autoFocus={autoFocus}
          disabled={disabled}
          error={isError}
          slotProps={{
            ...slotProps,
            input: {
              className: clsx(getSpacingClass(variant)),
              ...slotProps.input,
            },
          }}
          sx={isRtl ? { textAlign: 'right', direction: 'rtl', ...sx } : sx}
          placeholder={placeholder}
          {...props}
        />
      )}
      {type === NoteType.Todo && (
        <Box
          className="border rounded pt-10 pb-9 px-3.5 focus-within:outline-1"
          sx={(theme) => ({
            borderColor: theme.palette.divider,
            ':hover': { borderColor: theme.palette.text.primary },
            ':focus-within': {
              borderColor: theme.palette.primary.main,
              outlineColor: theme.palette.primary.main,
            },
          })}
        >
          <Todo
            placeId={placeId}
            actions={actions}
            title={title}
            scope={scope}
          />
        </Box>
      )}
      <div
        className={clsx(
          'absolute bottom-0 flex p-2 justify-between w-full',
          isRtl && 'flex-row-reverse',
        )}
      >
        <div className={clsx('flex items-center', isRtl && 'flex-row-reverse')}>
          {isNew && (
            <>
              <NoteTypeToggle />
              <ScopeSwitch />
            </>
          )}
        </div>
        <FormInput<NoteData>
          name="type"
          type="hidden"
          defaultValue={note?.type ?? NoteType.Note}
        />
        {isTextual && !isEdit && (
          <Tooltip title="Save">
            <IconButton
              type="submit"
              className={clsx(isRtl && 'rotate-180')}
              disabled={disabled || isEmpty}
            >
              <SendRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

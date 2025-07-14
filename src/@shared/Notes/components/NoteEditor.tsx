import { FormInput, FormTextField } from '@common/Form';
import Tooltip from '@common/Tooltip';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import IconButton from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import { NoteType } from '@root/types';
import { NoteResponse } from '@services/api';
import { NoteData } from '@shared/Notes/components/NoteForm';
import { NoteTypeToggle } from '@shared/Notes/components/NoteTypeToggle';
import { ITranslations, useTranslations } from '@translations';
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
}

const isValidUrl = (value: string) =>
  !value ||
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/[^\s]*)?$/.test(value);

const getPlaceholder = (
  variant: EditorVariant,
  type: NoteType,
  translations: ITranslations,
): string => {
  switch (type) {
    case NoteType.Note:
      return variant === 'reply'
        ? translations.notes.add.comment
        : translations.notes.add.note;
    case NoteType.Link:
      return variant === 'reply' ? '' : translations.notes.add.link;
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
  ...props
}: Props) => {
  const { watch, setValue } = useFormContext<NoteData>();
  const translations = useTranslations();

  const [value, title, type] = watch(['note', 'title', 'type']);

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

  const placeholder = getPlaceholder(variant, type, translations);

  return (
    <div className="relative" key={type}>
      {(variant === 'add' || variant === 'edit') && (
        <FormTextField<NoteData>
          variant="standard"
          placeholder={translations.notes.add.title}
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
          <Tooltip title={translations.common.save}>
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

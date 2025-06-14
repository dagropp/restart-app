import Form from '@common/Form';
import { NoteResponse, NoteType } from '@services/api';
import { string } from '@utils/string.utils';
import { type ReactNode } from 'react';

export interface NoteData {
  note: string;
  scope: boolean;
  type: NoteType;
  title?: string;
}

interface Props {
  onSave: (data: NoteData) => Promise<void>;
  children: ReactNode;
  className?: string;
  note?: NoteResponse;
}

const isValid = (update: NoteData, current?: NoteResponse) => {
  if (string.isEmpty(update.note)) return false;
  if (!current) return true;
  return update.note !== current.data || update.title !== current.title;
};

export const NoteForm = ({ onSave, children, className, note }: Props) => {
  const handleSubmit = async (update: NoteData) => {
    if (isValid(update, note)) await onSave(update);
  };

  return (
    <Form<NoteData> onSubmit={handleSubmit} className={className}>
      {children}
    </Form>
  );
};

import { City, Country, NoteScope, NoteType } from '@root/types';
import apiService, {
  NotesCountResponse,
  UseNotesHook,
  UseNotesOptions,
} from '@services/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { http } from '../../http.service';
import { NoteResponse, StatusResponse } from '../types';
import { getUrl } from '../utils';

const get = (
  placeId?: City | Country,
  noteId?: number,
): Promise<NoteResponse[]> =>
  http.get(getUrl('notes', placeId), { id: noteId });

const getCount = (placeId: City | Country): Promise<NotesCountResponse> =>
  http.get(getUrl('notes', placeId, 'count'));

const getReplies = (parentId: number): Promise<NoteResponse[]> =>
  http.get(getUrl('notes', parentId, 'reply'));

const add = (
  placeId: City | Country | undefined,
  scope: NoteScope,
  data: string,
  type: NoteType,
  title?: string,
): Promise<NoteResponse> =>
  http.put(getUrl('notes', placeId), { data, scope, type, title });

const edit = (
  id: number,
  data: string,
  title?: string,
): Promise<NoteResponse> => http.patch(getUrl('notes', id), { data, title });

const reply = (parentId: number, data: string): Promise<StatusResponse> =>
  http.put(getUrl('notes', parentId, 'reply'), { data });

const deleteNote = (id: number): Promise<StatusResponse> =>
  http.delete(getUrl('notes', id));

const pin = (id: number, pinned: boolean): Promise<StatusResponse> =>
  http.post(getUrl('notes', id, 'pin'), { pinned });

const useReplies = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ['getReplies', id, enabled],
    queryFn: () => apiService.notes.getReplies(id),
    enabled,
  });

const useNotes = ({
  placeId,
  noteId,
  enabled,
}: UseNotesOptions = {}): UseNotesHook => {
  const [notes, setNotes] = useState<NoteResponse[]>([]);

  const query = useQuery({
    queryKey: ['getNotes', placeId, noteId, enabled],
    queryFn: () => get(placeId, noteId),
    enabled,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) setNotes(query.data);
  }, [query.data, query.isSuccess]);

  const add = (note: NoteResponse) => setNotes((prev) => [note, ...prev]);
  const update = (note: NoteResponse) =>
    setNotes((prev) => prev.map((item) => (item.id === note.id ? note : item)));
  const remove = (id: number) =>
    setNotes((prev) => prev.filter((item) => item.id !== id));
  const modifyReplyCount = (noteId: number, count: number) =>
    setNotes((prev) =>
      prev.map((item) =>
        item.id === noteId ? { ...item, replies: item.replies + count } : item,
      ),
    );

  return { query, notes, actions: { add, update, remove, modifyReplyCount } };
};

const useNotesNew = ({ placeId, noteId, enabled }: UseNotesOptions = {}) =>
  useQuery({
    queryKey: ['getNotes', placeId, noteId, enabled],
    queryFn: () => get(placeId, noteId),
    enabled,
  });

const useCount = (placeId: City | Country, enabled?: boolean) =>
  useQuery({
    queryKey: ['getNotesCount', placeId],
    queryFn: async () => {
      const { total } = await getCount(placeId);
      return total;
    },
    enabled,
  });

export const notes = {
  getReplies,
  useReplies,
  add,
  edit,
  reply,
  delete: deleteNote,
  pin,
  useNotes,
  useCount,
  useNotesNew,
};

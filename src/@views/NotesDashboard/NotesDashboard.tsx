import { type NotesTabKey } from '@root/types';
import { lazy } from 'react';

interface Props {
  tab: NotesTabKey;
}

const NotesDashboardComponent = lazy(() => import('./NotesDashboardComponent'));

const NotesDashboard = ({ tab }: Props) => (
  <NotesDashboardComponent tab={tab} />
);

export default NotesDashboard;

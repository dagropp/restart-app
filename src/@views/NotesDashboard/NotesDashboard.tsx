import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import { NotesTabKey } from '@root/types';
import apiService from '@services/api';
import titleService from '@services/title';
import Notes from '@shared/Notes';
import { interpolateTranslations, useTranslations } from '@translations';
import { object } from '@utils/object.utils';
import NoteView from '@views/NoteView';
import { useLayoutEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import { NotesTabData } from './types';

interface Props {
  tab: NotesTabKey;
}

const getPath = (path: NotesTabKey) => `/notes/${path}`;

const NotesDashboard = ({ tab }: Props) => {
  const { pathname } = useLocation();
  const translations = useTranslations().notes;
  const compTranslations = translations.tabs;

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = apiService.notes.useNotesNew();

  const key = pathname?.split('/').at(-1) as NotesTabKey;

  const routes: Record<NotesTabKey, NotesTabData> = useMemo(
    () => ({
      [NotesTabKey.NOTES]: {
        label: interpolateTranslations(compTranslations.notes, {
          notes: notes.length,
        }),
        element: <Notes loading={isLoading} notes={notes} refetch={refetch} />,
      },
      [NotesTabKey.NOTE]: {
        element: <NoteView />,
      },
      [NotesTabKey.CHECKLIST]: {
        label: compTranslations.checklist,
        element: <div>{compTranslations.checklist}</div>,
      },
    }),
    [
      compTranslations.checklist,
      compTranslations.notes,
      isLoading,
      notes,
      refetch,
    ],
  );

  useLayoutEffect(() => {
    const keyTitle = key && key in routes ? routes[key].label : '';
    titleService.setTitle(keyTitle);
  }, [key, routes]);

  return (
    <div className="px-5">
      <MuiTabs
        value={key}
        className="sticky top-0 z-10"
        sx={{ bgcolor: (theme) => theme.palette.background.default }}
      >
        {object
          .entries(routes)
          .filter(([, { label }]) => !!label)
          .map(([key, { label }]) => (
            <MuiTab
              key={key}
              value={key}
              label={label}
              component={Link}
              to={getPath(key)}
            />
          ))}
      </MuiTabs>
      <div className="pt-5">{routes[tab].element}</div>
    </div>
  );
};

export default NotesDashboard;

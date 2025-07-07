import { LoginState, useAppContext } from '@context/app';
import { UserContextWrapper } from '@context/user';
import { useTheme } from '@mui/material/styles';
import apiService from '@services/api';
import AppToolbar from '@shared/AppHeader';
import { object } from '@utils/object.utils';
import { style } from '@utils/style.utils';
import CityPage from '@views/CityPage';
import CompareView from '@views/CompareView';
import Countries from '@views/Countries/Countries';
import CountryPage from '@views/CountryPage';
import { EditUser } from '@views/EditUser';
import Group from '@views/Group';
import Login from '@views/Login';
import NotesView from '@views/NotesView';
import NoteView from '@views/NoteView';
import Settings from '@views/Settings';
import { Fragment, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as LibRoutes,
} from 'react-router';

import App from './App';
import { CityTabKey, CountryTabKey, SettingsTabKey } from './types';

const overlay = document.getElementById('overlay');

interface ScrollToTopProps {
  scrollElement: HTMLDivElement | null;
}

const ScrollToTop = ({ scrollElement }: ScrollToTopProps) => {
  useEffect(() => {
    const container =
      style.isLargerThanTablet && scrollElement ? scrollElement : window;
    container.scrollTo({ top: 0 });
  }, [scrollElement]);

  return null;
};

const Routes = () => {
  const { isLoggedIn } = useAppContext();
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const Wrapper =
    isLoggedIn === LoginState.Valid ? UserContextWrapper : Fragment;

  const { isLoading: isCitiesLoading } = apiService.useCities(
    isLoggedIn === LoginState.Valid,
  );
  const { isLoading: isScoresLoading } = apiService.score.use(
    isLoggedIn === LoginState.Valid,
  );

  useEffect(() => {
    if (!isCitiesLoading && !isScoresLoading) overlay?.classList.add('done');
  }, [isCitiesLoading, isScoresLoading]);

  return (
    <BrowserRouter>
      <ScrollToTop scrollElement={scrollRef.current} />
      <Wrapper>
        <div
          className="flex flex-col w-full lg:flex-row"
          style={{ backgroundColor: theme.palette.background.default }}
        >
          {isLoggedIn === LoginState.Valid && <AppToolbar />}
          <div
            className="w-full lg:overflow-x-hidden lg:h-screen lg:overflow-y-auto"
            ref={scrollRef}
          >
            <div className="w-[1600px] mx-auto max-w-full box-border">
              {isLoggedIn === LoginState.Valid ? (
                <LibRoutes>
                  <Route index element={<App />} />
                  <Route path="city/:id">
                    <Route
                      index
                      element={<Navigate to={CityTabKey.OVERVIEW} replace />}
                    />
                    {object.values(CityTabKey).map((tab) => (
                      <Route
                        key={tab}
                        path={tab}
                        element={<CityPage tab={tab} />}
                      />
                    ))}
                  </Route>
                  <Route path="countries">
                    <Route index element={<Countries />} />
                    <Route path=":id">
                      <Route
                        index
                        element={
                          <Navigate to={CountryTabKey.OVERVIEW} replace />
                        }
                      />
                      {object.values(CountryTabKey).map((tab) => (
                        <Route
                          key={tab}
                          path={tab}
                          element={<CountryPage tab={tab} />}
                        />
                      ))}
                    </Route>
                  </Route>
                  <Route path="compare">
                    <Route index element={<CompareView />} />
                  </Route>
                  <Route path="notes">
                    <Route index element={<NotesView />} />
                    <Route path=":note" element={<NoteView />} />
                  </Route>
                  <Route path="group">
                    <Route index element={<Group />} />
                  </Route>
                  <Route path="settings">
                    <Route
                      index
                      element={
                        <Navigate to={SettingsTabKey.EDIT_USER} replace />
                      }
                    />
                    {object.values(SettingsTabKey).map((tab) => (
                      <Route
                        key={tab}
                        path={tab}
                        element={<Settings tab={tab} />}
                      />
                    ))}
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </LibRoutes>
              ) : (
                <LibRoutes>
                  <Route index element={<Login />} />
                  <Route path="signup" element={<EditUser />} />
                </LibRoutes>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </BrowserRouter>
  );
};

export default Routes;

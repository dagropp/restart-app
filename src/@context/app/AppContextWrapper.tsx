import Toast, { toastService, type ToastState } from '@common/Toast';
import { ThemeProvider } from '@mui/material/styles';
import { Currency, ThemeType } from '@root/types';
import apiService, { type CurrencyList } from '@services/api';
import storageService from '@services/storage';
import { useQuery } from '@tanstack/react-query';
import {
  memo,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { AppContext } from './AppContext';
import { appThemes } from './constants';
import { type IAppContext, LoginState } from './types';

interface Props {
  children: ReactNode;
}

interface ContextInnerWrapperProps {
  children: ReactNode;
  value: IAppContext;
}

const storedUser = storageService.get('user');
const storedCurrency = storageService.get('currency');

const ContextInnerWrapper = memo(
  ({ children, value }: ContextInnerWrapperProps) => {
    return <AppContext value={value}>{children}</AppContext>;
  },
);

export const AppContextWrapper = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(LoginState.Pending);
  const [currency, setCurrency] = useState<Currency>(storedCurrency);
  const [toastState, setToastState] = useState<ToastState>(null);
  const [theme, setTheme] = useState<ThemeType>(storageService.get('theme'));

  const selectedTheme = useMemo(() => {
    if (theme === ThemeType.System) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? appThemes[ThemeType.Dark] : appThemes[ThemeType.Light];
    }
    return appThemes[theme];
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor =
      selectedTheme.palette.background.default;
    document.documentElement.style.color = selectedTheme.palette.text.primary;
  }, [selectedTheme]);

  const { data: currencies = {} as CurrencyList } = useQuery({
    queryKey: ['currencies', currency],
    queryFn: () => apiService.getCurrencies(currency),
    staleTime: Infinity,
  });

  useEffect(() => {
    storageService.set('currency', currency);
  }, [currency]);

  useEffect(() => {
    toastService.init(setToastState);
  }, []);

  useEffect(() => {
    if (storedUser.sessionId) {
      apiService.authentication.validate().then((res) => {
        setIsLoggedIn(res.isValid ? LoginState.Valid : LoginState.Invalid);
      });
    } else {
      setIsLoggedIn(LoginState.Invalid);
    }
  }, []);

  const ctxValue = {
    currency,
    setCurrency,
    currencies,
    isLoggedIn,
    setIsLoggedIn,
    toastState,
    setToastState,
    theme,
    setTheme,
  };

  return (
    <>
      <ThemeProvider theme={selectedTheme}>
        <ContextInnerWrapper value={ctxValue}>{children}</ContextInnerWrapper>
      </ThemeProvider>
      <Toast
        open={!!toastState}
        onClose={() => setToastState(null)}
        {...toastState}
      >
        {toastState?.message}
      </Toast>
    </>
  );
};

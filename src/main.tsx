import './index.css';

import { AppContextWrapper } from '@context/app';
import dateService from '@services/date.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TranslationsContextWrapper } from '@translations';
import { createRoot } from 'react-dom/client';

import Routes from './Routes';

dateService.init();

const queryClient = new QueryClient();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });

  caches.keys().then((cacheNames) => {
    for (const name of cacheNames) {
      caches.delete(name);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <TranslationsContextWrapper>
      <AppContextWrapper>
        <Routes />
      </AppContextWrapper>
    </TranslationsContextWrapper>
  </QueryClientProvider>,
);

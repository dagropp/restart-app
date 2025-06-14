import './index.css';

import { AppContextWrapper } from '@context/app';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dateService from '@services/date.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import Routes from './Routes';

dateService.init();

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContextWrapper>
        <Routes />
      </AppContextWrapper>
    </LocalizationProvider>
  </QueryClientProvider>,
);

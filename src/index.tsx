import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { MainPage } from '@/pages/main';
import { initMetrics } from '@/metrics/init';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={
        webLightTheme
      }>
          <MainPage />
      </FluentProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

initMetrics();
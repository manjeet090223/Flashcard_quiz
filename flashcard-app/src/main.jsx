import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import PageLoaderWrapper from './PageLoaderWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PageLoaderWrapper>
        <App />
      </PageLoaderWrapper>
    </HashRouter>
  </React.StrictMode>
);

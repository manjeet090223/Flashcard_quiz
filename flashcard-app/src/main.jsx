
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import PageLoaderWrapper from './PageLoaderWrapper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PageLoaderWrapper>
        <App />
      </PageLoaderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

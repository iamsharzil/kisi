import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import ErrorBoundary from './components/error-boundary';

import { GalleryProvider } from './context/gallery-provider';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ErrorBoundary>
      <GalleryProvider>
        <App />
      </GalleryProvider>
    </ErrorBoundary>
  </StrictMode>
);

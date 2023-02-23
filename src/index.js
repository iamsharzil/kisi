import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { GalleryProvider } from './context/GalleryProvider';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <GalleryProvider>
      <App />
    </GalleryProvider>
  </StrictMode>
);

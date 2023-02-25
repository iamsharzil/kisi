import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GalleryProvider } from './context/GalleryProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <GalleryProvider>
      <App />
    </GalleryProvider>
  </StrictMode>
);

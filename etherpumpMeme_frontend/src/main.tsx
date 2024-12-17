import '@rainbow-me/rainbowkit/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppKitProvider } from './layout/AppKitProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>

  </StrictMode>
);
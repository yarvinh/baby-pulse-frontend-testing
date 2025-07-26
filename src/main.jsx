import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PregnancyProvider } from './contexts/PregnancyContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PregnancyProvider>
      <App />
    </PregnancyProvider>
  </StrictMode>,
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { FormspreeProvider } from '@formspree/react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormspreeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormspreeProvider>
  </StrictMode>,
)

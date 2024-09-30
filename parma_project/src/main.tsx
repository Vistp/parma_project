import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <CssBaseline />
        <App />
    </BrowserRouter>
  </StrictMode>,
)

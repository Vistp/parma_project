import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ThemeContextProvaider } from 'app/ThemeContextProvaider';

createRoot(document.getElementById('root')!).render(
  <ThemeContextProvaider>
    <App />
  </ThemeContextProvaider>,
);

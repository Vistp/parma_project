import { createRoot } from 'react-dom/client';
import App from './app/App';
import { ThemeContextProvaider } from 'app/ThemeContextProvaider';
import RegStore from 'components/register/regStore';
import { createContext } from 'react';

interface RegState {
  regStore: RegStore
}

const regStore = new RegStore();

export const Context = createContext<RegState>({
  regStore,
})

createRoot(document.getElementById('root')!).render(
  <ThemeContextProvaider>
    <Context.Provider value={{regStore}}>
      <App />
    </Context.Provider>
  </ThemeContextProvaider>,
);
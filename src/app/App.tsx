import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'components/Login';
import Register from 'components/RegisterForm';
import HomePage from 'pages/HomePage';
import DrillsPage from 'pages/DrillsPage';
import ErrorPage from 'pages/ErrorPage';
import NotFoundPage from 'pages/NotFoundPage';
import { useThemeContext } from './ThemeContextProvaider';
import { ThemeProvider, CssBaseline } from '@mui/material';

const App = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/drills" element={<DrillsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

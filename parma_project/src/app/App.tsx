import {Routes, Route, useNavigate} from 'react-router-dom'
import LoginForm from '../widgets/ui/components/LoginForm.tsx';
import HomePage from "../pages/HomePage.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import {useEffect} from "react";
import { checkConnectionFunction } from "../shared/utils/checkConnectionFunction.ts";
import DrillsPage from '../pages/DrillsPage.tsx';



// import React, { useEffect } from 'react';
//
import { ThemeProvider, useTheme } from '../context/ThemeContext.tsx';
import { ConfigProvider } from 'antd';
import Header from '../widgets/ui/components/Header.tsx';


function App() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Получите состояние темы

  useEffect(() => {
    checkConnectionFunction().then((result) => result === 'OK' ? navigate('/') : navigate('/error'));
  }, []);

  return (

    <ThemeProvider>
      <Header/>
      <ConfigProvider theme={{ mode: isDarkMode ? 'dark' : 'light' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginForm />} />
        <Route path="/drills" element={<DrillsPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Switch } from 'antd';
// import { useTheme } from 'context/ThemeContext.tsx';
import { ThemeProvider, useTheme } from '../../../context/ThemeContext.tsx';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Используем хук темы

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <h1>Парматрекинг</h1>
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        checkedChildren="Тёмная"
        unCheckedChildren="Светлая"
      />
    </header>
  );
};

export default Header;

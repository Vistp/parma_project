import React from 'react';
import { Switch } from 'antd';
import { useTheme } from './ThemeContext';

export const Theming: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Используем хук темы

  return <Switch checked={isDarkMode} onChange={toggleTheme} checkedChildren="Тёмная" unCheckedChildren="Светлая" />;
};

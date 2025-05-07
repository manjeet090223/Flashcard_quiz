import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import './ToggleButton.css'; 

const ToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-icon">
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};
export default ToggleButton;

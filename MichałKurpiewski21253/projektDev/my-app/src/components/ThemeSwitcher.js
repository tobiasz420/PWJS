import React from 'react';
import './ThemeSwitcher.css';

function ThemeSwitcher({ theme, toggleTheme }) {
  return (
    <div className="theme-switcher" onClick={toggleTheme} title="Zmień motyw">
      {theme === 'dark' ? (
        <div className="icon-sun"></div>
      ) : (
        <div className="icon-moon"></div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
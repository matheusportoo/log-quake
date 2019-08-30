import React from 'react';
import AccessibilityControl from './header/AccessibilityControl';
import ThemeControl from './header/ThemeControl';

const Header = () => (
  <header className="c-header l-app__header">
    <h1 className="o-title c-header__title">
      Parser Quake Log v1.0
    </h1>
    <div className="c-header__controls">
      <AccessibilityControl />
      <ThemeControl />
    </div>
  </header>
);

export default Header;

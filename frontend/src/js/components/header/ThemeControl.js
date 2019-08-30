import React from 'react';
import Button from '../Button';

const root = document.documentElement;
const themeColors = {
  main: { colorHighlight: '#4196eb', colorHighlightDarken: '#368adf' },
  second: { colorHighlight: '#9566FF', colorHighlightDarken: '#9555FF' },
  third: { colorHighlight: '#FF6160', colorHighlightDarken: '#FF617B' },
  fourth: { colorHighlight: '#FFA730', colorHighlightDarken: '#FFB230' }
}

const changeThemeColor = (theme) => {
  root.style.setProperty('--color-highlight', themeColors[theme].colorHighlight);
  root.style.setProperty('--color-highlight-darken', themeColors[theme].colorHighlightDarken);
}

const ThemeControl = () => (
  <div className="c-header__chage-theme-controls">
    { Object.keys(themeColors).map(color => (
      <Button
        type="button"
        text=""
        onClick={ () => changeThemeColor(color) }
        customClasses={`-choose-theme -${color} c-header__chage-theme-button`} />
    )) }
  </div>
);

export default ThemeControl;

import React from 'react';
import Button from '../Button';

const root = document.documentElement;
const themeColors = {
  theme1: { colorHighlight: '#4196eb', colorHighlightDarken: '#368adf' },
  theme2: { colorHighlight: '#9566ff', colorHighlightDarken: '#9555ff' },
  theme3: { colorHighlight: '#ff6160', colorHighlightDarken: '#ff617b' },
  theme4: { colorHighlight: '#ffa730', colorHighlightDarken: '#ffb230' },
  theme5: { colorHighlight: '#59db2a', colorHighlightDarken: '#4fc225' },
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
        customClasses={`-choose-theme -${color} c-header__chage-theme-button`}
        key={ `theme-controls-${color}` } />
    )) }
  </div>
);

export default ThemeControl;

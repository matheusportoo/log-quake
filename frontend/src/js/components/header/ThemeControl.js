import React from 'react';
import Button from '../Button';

const html = document.querySelector('html');
const themeColors = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5'];

const changeThemeColor = (theme) => html.setAttribute('data-theme', theme)

const ThemeControl = () => (
  <div className="c-header__chage-theme-controls">
    { themeColors.map(color => (
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

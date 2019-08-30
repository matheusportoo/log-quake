import React from 'react';

const html = document.querySelector('html');
const fontSizes = ['80%', '85%', '90%', '95%', '100%', '105%', '110%', '115%', '120%'];
let startSizeIndex = 4;

const decreseContent = () => {
  if (startSizeIndex > 0) {
    startSizeIndex -= 1;
    html.style.fontSize = fontSizes[startSizeIndex];
  }
}

const increaseContent = () => {
  if (startSizeIndex < fontSizes.length) {
    startSizeIndex += 1;
    html.style.fontSize = fontSizes[startSizeIndex];
  }
}

const changeMode = (theme) => html.setAttribute('data-mode', theme)

const AccessibilityControl = () => (
  <div className="c-header__accessibility-controls">
    <svg className="o-icon c-header__accessibility-icon" onClick={ increaseContent }><use xlinkHref="#zoom-in" /></svg>
    <svg className="o-icon c-header__accessibility-icon" onClick={ decreseContent }><use xlinkHref="#zoom-out" /></svg>
    <svg className="o-icon c-header__accessibility-icon -light" onClick={ () => changeMode('light') }><use xlinkHref="#sunny" /></svg>
    <svg className="o-icon c-header__accessibility-icon -dark" onClick={ () => changeMode('dark') }><use xlinkHref="#night" /></svg>
  </div>
);

export default AccessibilityControl;

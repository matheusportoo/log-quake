import React from 'react';
import Button from './components/Button.js';
import './App.scss';

const html = document.querySelector('html');
const root = document.documentElement;
const fontSizes = ['85%', '90%', '95%', '100%', '105%', '110%', '115%'];
let startSizeIndex = 3;
const themes = {
  main: {
    colorHighlight: '#4196eb',
    colorHighlightDarken: '#368adf'
  },
  second: {
    colorHighlight: '#9566FF',
    colorHighlightDarken: '#9555FF'
  },
  third: {
    colorHighlight: '#FF6160',
    colorHighlightDarken: '#FF617B'
  }
}

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

const changeTheme = (theme) => {
  root.style.setProperty('--color-highlight', themes[theme].colorHighlight);
  root.style.setProperty('--color-highlight-darken', themes[theme].colorHighlightDarken);
}

const App = () => (
  <main className="app">
    <div className="app__main-content">
      <h1 className="app__title">Parser Quake Log 1.0</h1>
      <p className="app__subtitle">Selecione uma das opções abaixo para visualizar os jogos</p>
      <div>
        <Button type="button" text="Decrement" onClick={ decreseContent } />
        <Button type="button" text="Increment" onClick={ increaseContent } />
      </div>
      <div>
        <Button type="button" text="Main theme" onClick={ () => changeTheme('main') } />
        <Button type="button" text="Second theme" onClick={ () => changeTheme('second') } />
        <Button type="button" text="Third theme" onClick={ () => changeTheme('third') } />
      </div>
    </div>
  </main>
);

export default App;

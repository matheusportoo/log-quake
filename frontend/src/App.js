import React from 'react';
import Header from './js/components/Header';
import Footer from './js/components/Footer';
import MainContent from './js/components/MainContent';
import Symbols from './js/components/Symbols';

import './App.scss';

const App = () => (
  <div className="l-app">
    <Header />
    <MainContent />
    <Footer />
    <Symbols viewBox="0 0 24 24"/>
  </div>
);

export default App;

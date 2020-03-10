import React from 'react';
import './App.scss';
import Weather from './components/Weather';

export default function App() {
  return (
    <div className="App container-flexible">
      <header className="App-header">
        <Weather />
      </header>
    </div>
  );
}

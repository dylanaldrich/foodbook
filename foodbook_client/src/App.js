import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Routes from './config/Routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes />
      <h1>Welcome to foodbook</h1>
    </div>
  );
}

export default App;

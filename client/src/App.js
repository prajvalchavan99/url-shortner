import React from 'react';
import ShortenerForm from './components/ShortenerForm';
import RetrieveUrl from './components/RetrieveUrl';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Secure URL Shortener</h1>
      </header>
      <main>
        <ShortenerForm />
        <RetrieveUrl />
      </main>
    </div>
  );
}

export default App;

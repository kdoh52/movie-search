import './App.css';
import React from 'react';
import Jumbotron from './components/Jumbotron';
import Searchbar from './components/Searchbar';
import Saved from './components/Saved';
import { FavoritesProvider } from './contexts/FavoritesContext';


function App() {

  return (
    <FavoritesProvider>
      <Jumbotron />
      <Saved />
      <Searchbar />
    </FavoritesProvider>
  );
}

export default App;

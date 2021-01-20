import './App.css';
import React, { useState, useEffect } from 'react';
import Jumbotron from './components/Jumbotron';
import Searchbar from './components/Searchbar';
import Saved from './components/Saved';
import { BrowserRouter as Router } from "react-router-dom";
import { FavoritesProvider } from './contexts/FavoritesContext';
// import API from './utils/API';


function App() {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   searchDatabase()
  // }, [])

  // function searchDatabase() {
  //   API.getMovies()
  //   .then(res => 
  //       setMovies(res.data)
  //   ).catch(err => console.log(err));
  // }

  return (
    <FavoritesProvider>
      <Router>
        <Jumbotron />
        <Saved />
        <Searchbar />
      </Router>
    </FavoritesProvider>
  );
}

export default App;

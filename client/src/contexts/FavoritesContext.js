import React, { useContext, useState, useEffect } from 'react'
import API from '../utils/API';


const FavoritesContext = React.createContext()

export function useFavorites() {
    return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchDatabase()
        console.log('SEARCHING FAVORITES')
    }, [])
    
    function searchDatabase() {
        API.getMovies()
        .then(res => 
            setMovies(res.data)
        ).catch(err => console.log(err));
    }

    // console.log(children, "YOYOYOYO")
    return (
        <FavoritesContext.Provider value={movies}>
            {children}
        </FavoritesContext.Provider>
    )
}

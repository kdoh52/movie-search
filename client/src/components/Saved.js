import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';
import { Grid } from '@material-ui/core';
import SavedMovie from '../components/SavedMovie'
import Success from '../components/Success'
import Exceeds from '../components/Exceeds'
import { useFavorites } from "../contexts/FavoritesContext"

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    savedContainer: {
        marginBottom: '30px'
    }
}));

export default function Saved() {
    let classes = useStyles();
    const [movies, setMovies] = useState([])
    const favorites = useFavorites()


    useEffect(() => {
        setMovies(favorites)
    }, [favorites])

    return (
        <div>
        <Grid container justify='center' alignItems='center'>
            {movies.map(movie => (
                <Grid className={classes.savedContainer} item xs={4} sm={4} md={2}>
                    <SavedMovie 
                        dbID={movie._id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        image={movie.image}
                    />
                </Grid>
            ))}
        </Grid>
        {movies.length === 5 ? (
            <Success/>
        ) : (null)
        }
        {movies.length > 5 ? (
            <Exceeds/>
        ) : (null)
        }
        </div>
    )
}

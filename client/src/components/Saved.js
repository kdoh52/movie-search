import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';
import { Grid, Typography, Button } from '@material-ui/core';
import SavedMovie from '../components/SavedMovie'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    form: {
        marginLeft: "10%"
    },
    searchBar: {
        marginBottom: '40px'
    },
}));

export default function Saved() {
    let classes = useStyles();
    const [movies, setMovies] = useState([])

    useEffect(() => {
        searchDatabase()
    }, [movies])

    function searchDatabase() {
        API.getMovies()
        .then(res => 
            // console.log(res.data)
            setMovies(res.data)
        ).catch(err => console.log(err));
    }


    return (
        <div>
        <Grid container justify='center' alignItems='center'>
            {movies.map(movie => (
                <Grid item xs={6} sm={4} md={3}>
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

        </div>
    )
}

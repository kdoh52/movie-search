import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';
import { Grid, Typography, Button } from '@material-ui/core';
import SavedMovie from '../components/SavedMovie'


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

    useEffect(() => {
        searchDatabase()
        // if (movies.length === 5) {
        //     // alert('yo')
        // }
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

        </div>
    )
}

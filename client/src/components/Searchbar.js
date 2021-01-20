import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import Movie from './Movie';

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
    button: {
        height: '40px',
        marginLeft: '5px'
    },
    resultsContainer: {
        marginBottom: '20px'
    }
}));

export default function Searchbar() {
    let classes = useStyles();
    
    const [movies, setMovies] = useState([])
    const [formObject, setFormObject] = useState({})

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function handleSearch(event) {
        event.preventDefault();
        searchMovies(formObject.movieTitle);
    };

    function searchMovies(query) {
        const options = {
            method: 'GET',
            url: 'https://www.omdbapi.com/?i=tt3896198&apikey=db95ff73&s='+ query,
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data.Search);
            setMovies(response.data.Search);
        }).catch(function (error) {
            console.error(error);
        });
    }

    return (
        <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={12} md={12} className={classes.searchBar}>
                <form className={classes.form}>
                    <Typography>
                        Search for a movie title
                    </Typography>
                    <TextField onChange={handleInputChange} name="movieTitle" variant='outlined' size='small' placeholder='type here'/>
                    {/* <TextField ref={titleRef} name="movieTitle" variant='outlined' size='small' placeholder='type here'/> */}
                    <Button onClick={handleSearch} variant="contained" color="primary" className={classes.button} type="submit">
                        <SearchIcon/>
                        Search
                    </Button>
                </form>
            </Grid>
            { movies ? (
                movies.map(movie => (
                    <Grid className={classes.resultsContainer} item xs={6} sm={4} md={3}>
                        <Movie 
                            id={movie.imdbID}
                            title={movie.Title}
                            year={movie.Year}
                            image={movie.Poster}
                        />
                    </Grid>
                ))
            ) : ('no results found')
            }
        </Grid>

    )
}

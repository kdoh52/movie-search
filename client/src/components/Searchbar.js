import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import Movie from './Movie';
import API from '../utils/API'



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
    const [disable, setDisable] = useState(false)
    
    // useEffect(() => {
    //     // searchMovies()
    // }, [movies])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function handleSearch(event) {
        event.preventDefault();
        console.log(formObject.movieTitle);
        searchMovies(formObject.movieTitle);
    };

    function searchMovies(query) {
        const options = {
            method: 'GET',
            url: 'http://www.omdbapi.com/?i=tt3896198&apikey=db95ff73&s='+ query,
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data.Search);
            setMovies(response.data.Search);
        }).catch(function (error) {
            console.error(error);
        });
    }

    function handleAddMovie(props) {
        // console.log(props.id)
        // console.log(props.title)
        // console.log(props.year)
        // console.log(props.image)
        setDisable(true)
        API.saveMovie({
          id: props.id,
          title: props.title,
          year: props.year,
          image: props.image,
        })
        .then().catch(err => console.log(err));
    };

    function checkDisable(data) {
        // setMovies(data)
        // console.log('hihihi' + props.id)
        movies.map(movie => {
            // console.log(movie.id)
            // console.log(movie)
            if (movie.id == data.imdbID) {
                setDisable(true)
                console.log('DISABLE')
            }
        })
    }

    return (
        <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={12} md={12} className={classes.searchBar}>
                <form className={classes.form}>
                    <Typography>
                        Search for a movie title
                    </Typography>
                    <TextField onChange={handleInputChange} name="movieTitle" variant='outlined' size='small' placeholder='type here'/>
                    <Button onClick={handleSearch} variant="contained" color="primary" className={classes.button} type="submit">
                        <SearchIcon/>
                        Search
                    </Button>
                </form>
            </Grid>
            {movies.map(movie => (
                <Grid className={classes.resultsContainer} item xs={6} sm={4} md={3}>
                    <Movie 
                        id={movie.imdbID}
                        title={movie.Title}
                        year={movie.Year}
                        image={movie.Poster}
                    />
                    {/* { checkDisable(movie) }
                    { disable ? (
                        <Button onClick={() => handleAddMovie(movie)} className={classes.button} variant="contained" size="small" disabled>Save</Button>
                    ) : (
                        <Button onClick={() => handleAddMovie(movie)} className={classes.button} variant="contained" size="small">Save</Button>
                    )} */}
                </Grid>
            ))}
        </Grid>

    )
}

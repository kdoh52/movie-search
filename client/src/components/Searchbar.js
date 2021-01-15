import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { TextField, Grid, Typography, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    form: {
        marginLeft: "10%"
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

    return (
        <Grid container>
            <Grid item xs={12} sm={12} md={12}>
                <form className={classes.form}>
                    <Typography>
                        Search for a movie title
                    </Typography>
                    <TextField onChange={handleInputChange} name="movieTitle" variant='outlined' size='small' placeholder='type here'/>
                    <Button onClick={handleSearch} variant="contained" color="primary">
                        <SearchIcon/>
                        Search
                    </Button>
                </form>
            </Grid>
        </Grid>

    )
}

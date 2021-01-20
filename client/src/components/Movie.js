import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import API from '../utils/API'
import { useFavorites } from "../contexts/FavoritesContext"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    // container: {
    //     marginTop: '50px'
    // },
    image: {
        // height: '20%',
        display: 'block',
        margin: 'auto',
        width: '40%',
        // height: '100px',
        // width: '100px',
    },
    button: {
        display: 'block',
        margin: 'auto'
    },
    title: {
        textAlign: 'center',
        marginBottom: '0px',
        fontSize: '1em',
        // color: 'red',
        '@media (max-width: 700px)' : {
            fontSize: '0.9em'
            // color: 'red'
        }
    },
    year: {
        textAlign: 'center',
        fontSize: '0.8em',
        marginTop: '8px'
    }
}));

export default function Movie(props) {
    let classes = useStyles()
    const [disable, setDisable] = useState(false)
    const checkFavorites = useFavorites()
    
    function checkDisable(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === props.id) {
                setDisable(true)
                // console.log('DISABLE')
                break
            } else {
                setDisable(false)
                // return
            }
        }
    }
    
    useEffect(() => {
        // console.log(checkFavorites, 'FROM MOVIE.js')
        checkDisable(checkFavorites)
        
    }, [props, checkFavorites])

    function handleAddMovie(props) {
        setDisable(true)
        API.saveMovie({
          id: props.id,
          title: props.title,
          year: props.year,
          image: props.image,
        })
        .then().catch(err => console.log(err));
    };

    return (
        <div className={classes.container}>
            <img src={props.image} className={classes.image} alt={props.title}/>
            <p className={classes.title}>{props.title}</p> 
            <p className={classes.year}>{props.year}</p> 
            { disable ? (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small" disabled>Save</Button>
            ) : (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small">Save</Button>
            )}
        </div>
    )
}

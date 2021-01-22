import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal } from '@material-ui/core';
import API from '../utils/API'
import { useFavorites } from "../contexts/FavoritesContext"

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));

export default function Movie(props) {
    let classes = useStyles()
    const [disable, setDisable] = useState(false)
    const checkFavorites = useFavorites()

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [details, setDetails] = useState([])

    const handleOpen = () => {
        setOpen(true);
        searchDetails(props.id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalbody = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{details.Title}</h2>
          <h4 id="simple-modal-title">{details.Year}</h4>
          <h4 id="simple-modal-title">{details.Rated}</h4>
          <img src={details.Poster} alt={details.Title}/>
          <p id="simple-modal-description">{details.Plot}</p>
          {/* <SimpleModal /> */}
        </div>
    );
    
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

    function searchDetails(id) {
        const options = {
            method: 'GET',
            // url: 'https://www.omdbapi.com/?i=tt3896198&apikey=db95ff73&s='+ query + "&plot=short&r=json",
            url: 'https://www.omdbapi.com/?apikey=db95ff73&i='+ id + "&plot=short&r=json",

        };
        
        axios.request(options).then(function (response) {
            console.log(response.data);
            setDetails(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }


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
            <img onClick={handleOpen} src={props.image} className={classes.image} alt={props.title}/>
            <p className={classes.title}>{props.title}</p> 
            <p className={classes.year}>{props.year}</p> 
            { disable ? (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small" disabled>Save</Button>
            ) : (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small">Save</Button>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalbody}
            </Modal>
        </div>
    )
}

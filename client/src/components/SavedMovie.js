import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import API from '../utils/API'


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
        marginBottom: '0px'
    },
    year: {
        textAlign: 'center',
        fontSize: '0.8em',
        marginTop: '8px'
    }
}));

export default function Movie(props) {
    let classes = useStyles()

    function handleRemoveMovie(props) {
        // console.log(props.id)
        // console.log(props.title)
        // console.log(props.year)
        console.log(props.dbID)
        API.deleteMovie(props.dbID)
        .then().catch(err => console.log(err));
    };

    return (
        <div className={classes.container}>
            {/* <p>{props.id}</p>  */}
            <img src={props.image} className={classes.image}/>
            <p className={classes.title}>{props.title}</p> 
            <p className={classes.year}>{props.year}</p> 
            <Button onClick={() => handleRemoveMovie(props)} className={classes.button} variant="contained" size="small">Remove</Button>
            {/* <div className={classes.add}>
                <AddBtn onClick={() => handleAddMovie(movie)}/>
            </div> */}
        </div>
    )
}

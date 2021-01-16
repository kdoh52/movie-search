import React, { useState, useEffect } from 'react'
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
    // const [movies, setMovies] = useState([])

    // let disable = false
    // let hehe = JSON.parse(props)

    useEffect(() => {
        // console.log(hehe + 'aoweijvaeowijaewoi')
        API.getMovies()
        .then(res => 
            // console.log(res.data)
            // setMovies(res.data)
            checkDisable(res.data)
            // res.data.map(movie => {
            //     // console.log(movie)
            //     if (movie.id == props.id) {
            //         setDisable(true)
            //         console.log('DISABLE')
            //     }
            // })
        ).catch(err => console.log(err));
    }, [props])

    function checkDisable(data) {
        // setMovies(data)
        // console.log('hihihi' + props.id)
        data.map(movie => {
            console.log(movie.id)
            // console.log(movie)
            if (movie.id == props.id) {
                setDisable(true)
                console.log('DISABLE')
                return
            } else {
                setDisable(false)
                // return
            }
        })
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

    return (
        <div className={classes.container}>
            {/* <p>{props.id}</p>  */}
            <img src={props.image} className={classes.image}/>
            <p className={classes.title}>{props.title}</p> 
            <p className={classes.year}>{props.year}</p> 
            { disable ? (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small" disabled>Save</Button>
            ) : (
                <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small">Save</Button>
            )}

            {/* <Button onClick={() => handleAddMovie(props)} className={classes.button} variant="contained" size="small">Save</Button> */}
            {/* <div className={classes.add}>
                <AddBtn onClick={() => handleAddMovie(movie)}/>
            </div> */}
        </div>
    )
}

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        textAlign: 'center',
        margin: 'auto',
        marginBottom: '10px',
        fontSize: '1em',
        // color: 'red',
        '@media (max-width: 700px)' : {
            fontSize: '0.9em'
            // color: 'red'
        }
    },
}));

export default function Success() {
    let classes = useStyles()
    return (
        <div>
            <h4 className={classes.title}>
                Please nominate only 5 movies
            </h4>
        </div>
    )
}

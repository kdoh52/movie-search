import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: 40
    },
    headline: {
        marginTop: 10,
        marginBottom: 25
    },
}))

export default function Jumbotron() {
    let classes = useStyles();

    return (
        <div>
            <Typography className={classes.title} variant='h3' align='center'>
                The Shoppies
            </Typography>
            <Typography className={classes.headline} variant='h5' align='center'>
                Nominate your top 5 movies
            </Typography>
        </div>
    )
}

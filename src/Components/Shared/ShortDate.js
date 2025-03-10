import { Box, Grid, Typography, makeStyles } from '@material-ui/core'
import { DateTime } from 'luxon'
import React from 'react'

const useStyles = makeStyles({
    date:{
        width: "fit-content",
        "& > *":{
            lineHeight: "1em"
        }
    },
    day:{
        fontSize: "1em"
    },
    month:{
        fontSize: ".8em",
        textTransform: "uppercase"
    }
})

//Expects an ISO Date
export default function ShortDate({ date }) {

    const classes = useStyles();
    const parsed = DateTime.fromISO(date)

    return (<Box>
        <Grid container direction='column' alignItems='center' className={classes.date}>
            <Typography className={classes.day}>{parsed.day}</Typography>
            <Box height="5px" />
            <Typography className={classes.month}>{parsed.monthShort}</Typography>
        </Grid>
    </Box>)
}
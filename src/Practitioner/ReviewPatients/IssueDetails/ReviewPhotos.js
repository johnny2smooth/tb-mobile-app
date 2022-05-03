import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Grid, Typography, Avatar } from '@material-ui/core';
import { DateTime } from 'luxon';
import { CameraAlt, ChevronRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../../Basics/Colors';
import ReviewPhotoPopOver from '../../Shared/ReviewPhotoPopOver';

const useStyles = makeStyles({
    photoReport: {
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: ".5em",
        width: "100%",
        border: "solid 1px lightgray",
        borderRadius: "4px"
    },
    avatar: {
        fontSize: "1em",
        width: "1.5em",
        height: "1.5em",
        backgroundColor: Colors.buttonBlue
    },
    icon: {
        color: Colors.textGray
    }
})

const ReviewPhotos = ({ patient }) => {

    const classes = useStyles();

    return (
        <>
            <ReviewPhotoPopOver unreviewedPhotos={patient.unreviewedPhotos} />
            <Box padding=".5em 0" bgcolor={Colors.lighterGray} borderRadius="4px">
            <Grid wrap="nowrap" alignItems="center" container>
                <CameraAlt className={classes.icon} />
                <Box width=".5em" />
                <Typography>Photos to review</Typography>
                <Box flexGrow="1" />
                {/* <Avatar className={classes.avatar} >{patient.issues.unreviewedPhotos.length}</Avatar> */}
            </Grid>
            <Box height=".5em" />
            <div>
                {patient.unreviewedPhotos.map(photo => <PhotoToReview key={`photo-to-review-${photo.photoId}`} photo={photo} />)}
            </div>
            </Box>
        </>
    )
}

const PhotoToReview = ({ photo }) => {
    const classes = useStyles();

    return (<>
        <ButtonBase disableTouchRipple component={Link} to={`?review-photo=${photo.photoId}`} className={classes.photoReport}>
            <Typography>{DateTime.fromISO(photo.createdAt).toLocaleString({ day: "numeric", month: "numeric" })}</Typography>
            <Box flexGrow="1" />
            <img style={{ display: "block" }} width="50px" src={photo.url} />
            <ChevronRight />
        </ButtonBase>
        <Box height="5px" />
    </>)
}

export default ReviewPhotos;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Grid, Fade, IconButton, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, Typography, Checkbox, TextField, Modal
} from '@material-ui/core';
import Minus from '@material-ui/icons/IndeterminateCheckBox';
import Plus from '@material-ui/icons/AddBox';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Clear } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import FlatButton from '../../Components/FlatButton';

const useStyles = makeStyles({
    popover: {
        boxSizing: "border-box",
        margin: ".5em",
        width: "100vw",
        maxWidth: "100vw",
        height: "100vh",
        borderRadius: "0",
        backgroundColor: "unset",
        boxShadow: "none"
    },
    backdrop: {
        backgroundColor: 'white'
    },
    popoverContent: {
        flexGrow: 1
    },
    exitButton: {
        paddingLeft: "0"
    },
    modalContainer: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"

    },
    topBar: {
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: "100",
        borderBottom: "1px solid lightgray"
    },
    form: {
        flexGrow: "1",
        padding: "1em"
    }
})

const MainInputs = ({state,handleChange}) => {


    const { t } = useTranslation('translation');
    const classes = useStyles();

    return(<div>
        <FormControl component="fieldset">
            <FormLabel className={classes.resultLabel} component="legend">{t('redoPhoto.selectResult')}</FormLabel>
            <RadioGroup name="approved" value={state.approved} onChange={handleChange}>
                <Grid container direction='column'>
                    <FormControlLabel value="true" control={<Radio color='primary' />} label={<Grid container alignItems='center'><Plus /><Typography>{t('redoPhoto.detected')}</Typography></Grid>} />
                    <FormControlLabel value="false" control={<Radio color='primary' />} label={<Grid container alignItems='center'><Minus /><Typography>{t('redoPhoto.notDetected')}</Typography></Grid>} />
                </Grid>
            </RadioGroup>
        </FormControl>
    </div>)
}


const RedoInputs = ({state,handleChange}) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<>
        <div>
            <FormControlLabel
                control={<Checkbox color='primary' checked={state.redoFlag} onChange={handleChange}
                    name="redoFlag" />}
                label={t('redoPhoto.ask')} />
        </div>
        <Fade in={state.redoFlag}>
            <div style={{ width: "100%" }}>
                <FormLabel disabled={!state.redoFlag} className={classes.resultLabel} component="legend">{t('redoPhoto.attachMessage')}</FormLabel>
                <Box height=".5em" />
                <TextField disabled={!state.redoFlag} name="redoReason" variant="outlined" fullWidth onChange={handleChange} value={state.redoReason} multiline rows={2} />
            </div>
        </Fade>
    </>)
}

const PanImage = ({ url }) => {

    return (
        <Box padding="1em">
            <TransformWrapper
                initialScale={0.4}
                minScale={0.4}
                centerOnInit>
                <TransformComponent wrapperStyle={{ backgroundColor: "white", border: "solid 1px lightgray", borderRadius: "4px", width: "100%", maxHeight: "40vh" }}>
                    <Fade appear in timeout={1000}>
                        <img src={url} alt="test-strip-image-to-review" />
                    </Fade>
                </TransformComponent>
            </TransformWrapper>
        </Box>
    )
}

const Buttons = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    const [onRedo, setOnRedo] = useState(false);
    const [state, setState] = useState({ approved: null, redoFlag: false, redoReason: "" });

    const handleChange = (e) => {
        let tempState = { ...state };
        tempState[e.target.name] = e.target.name === "redoFlag" ? e.target.checked : e.target.value;
        setState(tempState);
    }

    const handleNext = () => {
        if(state.approved === "false"){
            setOnRedo(true);
        }
    }

    const handleBack = () => {
        setOnRedo(false);
    }

    const showResubmissionOption = state.approved === "false"
    const enableSubmit = state.approved !== null;

    const inputProps = {state: state, handleChange: handleChange}


    return (
        <Grid className={classes.form} container direction='column'>
            {onRedo ? <RedoInputs {...inputProps} /> : <MainInputs {...inputProps} />}
            <Box flexGrow="1" />
            <Grid style={{ paddingTop: "2em" }} container>
                <Box aria-hidden flexGrow="1" />
                {onRedo && <FlatButton onClick={handleBack}>Go Back</FlatButton>}
                <Box width=".5em" />
                <FlatButton onClick={handleNext} disabled={!enableSubmit}>Continue</FlatButton>
            </Grid>
        </Grid>
    )
}

const ReviewPhotoPopOver = observer(({ unreviewedPhotos }) => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const photoId = new URLSearchParams(uiStore.urlSearchParams).get("review-photo")

    const selectedPhoto = photoId ? unreviewedPhotos.find(each => { return each.photoId === parseInt(photoId) }) : false;

    return (
        <>
            {selectedPhoto && <Modal
                BackdropProps={{ style: { backgroundColor: "white" } }}
                open={!!selectedPhoto}>
                <div className={classes.modalContainer}>
                    <Grid className={classes.topBar} container alignItems='center' wrap="nowrap">
                        <Box padding="1em">
                            <Typography>Review Photo</Typography>
                        </Box>
                        <Box flexGrow="1" />
                        <IconButton className={classes.exitButton} onClick={uiStore.goBack}>
                            <Clear />
                        </IconButton>
                    </Grid>
                    <PanImage url={selectedPhoto.url} />
                    <Buttons />
                </div>
            </Modal>}
        </>
    )

});


export default ReviewPhotoPopOver;
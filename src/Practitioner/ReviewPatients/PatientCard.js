import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, IconButton, Box, Typography, Collapse, CircularProgress, Button } from '@material-ui/core';
import { Check, Message, ArrowDropDownCircle as Down, CheckCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../Basics/Colors';
import IssueArea from './IssueArea';
import AdherenceLabel from './AdherenceLabel';
import { daysSinceISODateTime } from '../../Utility/TimeUtils';
import { useTranslation } from 'react-i18next';
import useAsync from '../../Hooks/useAsync';
import PractitionerAPI from '../../API/PractitionerAPI';
import TreatmentWeek from './TreatmentWeek';
import useToggle from '../../Hooks/useToggle';
import IssueDetails from './IssueDetails';
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
    container: {
        width: "100%",
        overflow: "wrap",
        backgroundColor: "white",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
        "& a, & a:visited": {
            textDecoration: "none"
        }
    },
    name: {
        fontSize: "1.25em",
        color: Colors.buttonBlue
    },
    bottomSection: {
        width: "100%"
    },
    messaged: {
        fontSize: ".9em",
        color: Colors.textDarkGray
    },
    rotate: {
        transform: "rotate(180deg)"
    },
    reviewButton: {
        backgroundColor: Colors.calendarGreen,
        padding: ".25em",
        "&:disabled": {
            backgroundColor: Colors.lightgray
        }
    },
    expand: {
        width: "fit-content",
        paddingRight: "0",
        justifyContent: "flex-end",
        textTransform: "none",
        color: Colors.buttonBlue
    },
    reviewPhotoPrompt: {
        lineHeight: "1.1em",
        borderLeft: "solid 3px red",
        paddingLeft: "5px"
    }
})

const PatientCard = ({ patient, markPatientAsReviewed, isReviewed, isSimpleView }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const [reviewed, setReviewed] = useState(false);
    const [showDetails, toggleDetails] = useToggle(false);

    const resolvePatient = async () => {
        return PractitionerAPI.resolvePatient(patient.id);
    }

    const { execute, status, value, error } = useAsync(resolvePatient, false);
    const success = status === "success";

    const handleExit = () => {
        if (success) {
            markPatientAsReviewed(patient.id);
        }
    }

    useEffect(() => {
        let timeout;
        if (success) {
            timeout = setTimeout(() => {
                setReviewed(true);
            }, 2000)
        }
        return function cleanup() {
            clearTimeout(timeout);
            if (success) {
                handleExit();
            }

        }
    }, [status])

    return (
        <Collapse onExited={handleExit} in={!reviewed}>
            <Box className={classes.container}>
                {success ? <Box padding="1em">
                    <Grid container>
                        <CheckCircle style={{color: Colors.green}} />
                        <Box width=".5em" />
                        <Typography>Review Submitted</Typography>
                    </Grid>
                </Box> : <><Box padding='.75em'>
                    <Grid alignItems='center' container wrap='nowrap'>
                        <Link to={`/patients/${patient.id}`}>
                            <Typography className={classes.name} >{patient.fullName}</Typography>
                        </Link>
                        <Box flexGrow={1} />
                        <TreatmentWeek patient={patient} />
                        <Box width=".5em" />
                        <AdherenceLabel patient={patient} />
                    </Grid>
                    <Box height=".5em" />
                    {!isSimpleView && <Grid alignItems='center' wrap="nowrap" container className={classes.bottomSection}>
                        <IssueArea issues={patient.issues.state} patientId={patient.id} />
                        <Box flexGrow={1} />
                        <Button className={classes.expand} onClick={toggleDetails}>
                            <Typography style={{ paddingRight: ".5em" }} noWrap>
                                {showDetails ? "Hide" : "Review"}
                            </Typography>
                            <Down className={showDetails ? classes.rotate : ""} />
                        </Button>
                    </Grid>}
                </Box>
                    {!isSimpleView && <Collapse in={showDetails}>
                        {showDetails && <IssueDetails visible={showDetails} patient={patient} />}
                        <ButtonArea isReviewed={isReviewed} loading={status === "pending"} patient={patient} resolvePatient={execute} />
                    </Collapse>}
                </>
                }
            </Box>
        </Collapse>
    )
}

const ButtonArea = ({ patient, resolvePatient, loading, isReviewed, isSimpleView }) => {

    const disable = patient.unreviewedPhotos.length > 0;
    const classes = useStyles();

    return (
        <Box padding="1em .5em">
            <Grid wrap="nowrap" justify='flex-end' alignItems='center' container>
                {disable && <Box padding=".5em">
                    <Typography className={classes.reviewPhotoPrompt} >Please review photos before checking this patient off</Typography>
                </Box>}
                <IconButton component={Link} to={`?onMessagingChannelId=${patient.channelId}`} style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', padding: ".25em" }}>
                    <Message style={{ color: Colors.buttonBlue }} />
                </IconButton>
                {(!isReviewed && !isSimpleView) && <>
                    <Box width=".5em" />
                    <IconButton disabled={disable} onClick={resolvePatient} className={classes.reviewButton}>
                        {loading ? <CircularProgress style={{ color: Colors.gray }} size="1em" variant='indeterminate' /> : <Check style={{ color: disable ? Colors.lighterGray : Colors.approvedGreen }} />}
                    </IconButton></>}
            </Grid>
        </Box>
    )
}

export default PatientCard;
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from './Styles';
import Colors from './Colors';
import CheckIcon from '@material-ui/icons/Check';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import PillIcon from './Icons/Pill.js'
import { DateTime } from 'luxon';
import ClickableText from './ClickableText';
import { useTranslation } from 'react-i18next';

import TempIcon from './Icons/Temp'

const useStyles = makeStyles({
    container: {
        ...Styles.flexColumn,
        width: "100%",
        "& > div": {
            borderBottom: "1px solid lightgray"
        },
        "& > div:last-child": {
            borderBottom: "none"
        },
    },
    parent: {
        margin: "auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "auto auto",
        gridColumnGap: "0",
        gridRowGap: "0",
        paddingBottom: ".5em",

    },
    one: {
        gridArea: "1 / 1 / 2 / 3",
        justifyContent: "flex-start",
        paddingLeft: "1em",
        "& > h2": {
            ...Styles.flexRow,
            alignItems: "center",
            fontSize: "1em",
            marginBottom: "5px",
            "& > svg": {
                margin: "0 .5em 0 0"
            }
        },
    },
    two: {
        gridArea: "2 / 1 / 3 / 3",
        color: Colors.textGray,
        alignItems: "flex-start",
        paddingLeft: "1em",
        "& > p": {
            margin: "0 0 2px 0"
        }
    },
    three: {
        gridArea: "1 / 3 / 3 / 4",
        ...Styles.flexCenter
    },
    check: {
        color: Colors.approvedGreen
    },
    stripPhoto: {
        height: "10vh"
    },
    negative: {
        color: Colors.calendarRed
    }
})

const PatientReport = (props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<div className={`${classes.container}`}>
        <ListItem negative={!props.medicationTaken} icon={<PillIcon />} title={t("commonWords.medication")} >
            <p> {props.medicationTaken ? `${t("patient.report.confirmation.takenAt")} ${DateTime.fromISO(props.timeTaken).toLocaleString(DateTime.TIME_24_SIMPLE)}` : `${t("patient.report.confirmation.notTaken")}:`}</p>
            {props.medicationNotTakenReason && <p>{props.medicationNotTakenReason}</p>}
        </ListItem>

        <ListItem icon={<TempIcon />} title={t("commonWords.symptoms")}>
            <SymptomList symptoms={props.selectedSymptoms} />
            {!props.pastReport &&<ClickableText big text={`${t("patient.report.confirmation.addMore")} +`} />}
        </ListItem>
        <PhotoListItem missingPhoto={props.missingPhoto} isPhotoDay={props.isPhotoDay} photoString={props.photoString} />
    </div>)
}

const SymptomList = (props) => {
    const { t, i18n } = useTranslation('translation');

    return (
        props.symptoms.map((each, index) => {
            return <p key={index}>{t(`symptoms.${each}.title`)}</p>
        })
    )
}

const PhotoListItem = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    if (props.isPhotoDay) {
        return (
            <ListItem negative={props.isPhotoDay && !props.photoString} icon={<CameraIcon />} title={t('commonWords.stripPhoto')}>
                {!props.missingPhoto ? <img className={classes.stripPhoto} src={props.photoString} /> : <p>{t('patient.report.confirmation.missingPhoto')}</p>}
            </ListItem>
        )
    } else {
        return (
            <ListItem icon={<CameraIcon />} title={t('commonWords.stripPhoto')}>
                <p>{t('patient.report.confirmation.noPhoto')}</p>
            </ListItem>
        )
    }

};

function ListItem(props) {

    const classes = useStyles();

    return (
        <div className={`${classes.parent}`}>
            <div className={classes.one}>
                <h2>{props.icon}
                    {props.title}</h2>
            </div>
            <div className={classes.two}>
                {props.children}
            </div>
            <div className={classes.three}>
                {props.negative ? <ClearIcon className={classes.negative} /> : <CheckIcon className={classes.check} />}
            </div>
        </div>
    )
}

export default PatientReport;
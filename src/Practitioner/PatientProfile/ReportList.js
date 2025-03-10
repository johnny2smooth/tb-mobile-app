import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';

import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Pending from '@material-ui/icons/Help';
import FeelingGood from '@material-ui/icons/Mood';
import FeelingBad from '@material-ui/icons/MoodBad';
import ReportCard from './ReportCard';
import ReportItem from './ReportCardItem';
import Button from '@material-ui/core/Button';
import Tag from '../../Components/Tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SingleReport from './SingleReport';

const useStyles = makeStyles({
    container: {
        height: "100%",
        maxHeight: "800px",
        overflow: "hidden scroll"
    },
    details: {
        display: "flex",
        width: "90%",
        justifyContent: "space-between",
        padding: "1em",
        borderTop: "1px solid lightgray"
    },
    reportPhoto: {
        flexBasis: "25%",
        "& > img": {
            width: "100%"
        }
    },
    noPhoto: {
        ...Styles.flexCenter,
        height: "100px",
        backgroundColor: Colors.lightgray
    },
    photoStatus: {
        display: "flex",
        alignItems: "center"
    },
    red: {
        color: "red"
    },
    loadButton: {
        border: `1px solid ${Colors.buttonBlue}`,
        color: Colors.buttonBlue,
        width: "90%",
        margin: "auto",
        marginBottom: "1em",
        display: "block"
    },
    capitalize: {
        textTransform: "capitalize",
    },
    small: {
        fontWeight: "normal",
        fontSize: ".75em"
    },
    lateTag: {
        marginLeft: "auto",
        marginRight: "1em",
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        letterSpacing: "1px",
        marginBottom: "5px"
    }
})

const ReportView = observer(() => {

    const { patientProfileStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
            <div className={classes.container}>
                {patientProfileStore.selectedPatientReports.length > 0 && patientProfileStore.selectedPatientReports.map(report => {
                    return <SingleReport key={`patient-report-${report.id}`} report={report} />
                })}
                {patientProfileStore.areMoreReportsToLoad && <Button disableElevation className={classes.loadButton} fullWidth onClick={patientProfileStore.loadMoreReports}>{t('commonWords.clickToLoadMore')}</Button>}
            </div>
    )

})

const Report = (props) => {
    const { report } = props;
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (

        <ReportCard
            date={report.date}
            expandedContent={<div className={classes.details}>
                <ReportItem title={t('commonWords.symptoms')} content={<FullSymptomList list={report.symptoms} />} />
                <ReportItem title={t('report.submittedAt')} content={<p>{DateTime.fromISO(report.updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}</p>} />
                <ReportItem title={t('report.feeling')} content={<Feeling doingOkay={report.doingOkay} />} />
                <ReportPhoto
                    required={report.photoWasRequired}
                    approval={report.photoDetails && report.photoDetails.approvalStatus}
                    url={report.photoUrl}
                    photoWasSkipped={report.photoWasSkipped}
                    whyPhotoWasSkipped={report.whyPhotoWasSkipped} />
            </div>}>
            <ReportItem title={t('commonWords.medication')} content={<TakenMedication report={report} />} />
            <ReportItem type="symptoms-preview" title={t('commonWords.symptoms')} content={<SymptomListPreview list={report.symptoms} />} />
            {report.photoWasRequired && <ReportItem title={t('report.photoSubmitted')} content={<span className={classes.capitalize}>{report.photoUrl ? t('commonWords.yes') : t('commonWords.no')}</span>} />}
            {report.numberOfDaysAfterRequest > 0 && <Grid style={{ marginLeft: "auto", alignSelf: "center" }} container direction="column">
                <Tag className={classes.lateTag} backgroundColor={Colors.warningRed}>{`${report.numberOfDaysAfterRequest} ${t('patient.report.dayLate', { count: report.numberOfDaysAfterRequest })}`}</Tag>
            </Grid>}
        </ReportCard>
    )
}

const TakenMedication = ({ report }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const takenTimeString = DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE);

    return (
        <>
            <span className={classes.capitalize}>{report.medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')} </span>
            {report.medicationWasTaken && <span className={classes.small}>{t('commonWords.atTime')} </span>}
            {report.medicationWasTaken && takenTimeString}
        </>
    )
}

const ReportPhoto = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    if (props.photoWasSkipped) {
        return (
            <div className={classes.reportPhoto}>
                <Typography className={classes.red} variant="body1" color="initial">{t('dashboard.skippedPhoto')}:</Typography>
                <Typography variant="body1" color="initial">{props.whyPhotoWasSkipped}</Typography>
            </div>
        )
    }

    return (<div className={classes.reportPhoto}>
        {props.url ? <><img src={props.url} />
            <div className={classes.photoStatus}>{props.approval === null ? <>
                <Pending style={{ color: Colors.yellow }} />
                {t('report.pending')} </> : (props.approval === true ?

                    <>
                        <Check style={{ color: Colors.green }} />
                        {t('report.conclusive')}
                    </>
                    :
                    <>
                        <Clear style={{ color: Colors.red }} />
                        {t('report.inconclusive')} </>)}</div>
        </>
            : <div className={classes.noPhoto}>{props.required ? <span className={classes.red}>{t('report.missedPhoto')}</span> : t('report.photoNotNeeded')}</div>}
    </div>)
}

const SymptomListPreview = (props) => {
    const { t } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? t(`symptoms.${props.list[0]}.title`) : t('coordinator.recentReports.none')}
        {props.list.length > 1 && ` +${props.list.length - 1}`}
    </>)
}

const FullSymptomList = (props) => {
    const { t } = useTranslation('translation');
    return (<>
        {props.list.length > 0 ? <div> {props.list.map(each => {
            return (<p key={each}>{t(`symptoms.${each}.title`)}</p>)
        })} </div> : <p>{t('coordinator.recentReports.none')}</p>}
    </>)
}

const Feeling = (props) => {
    return props.doingOkay ? <FeelingGood style={{ color: Colors.green }} /> : <FeelingBad style={{ color: Colors.red }} />
}

export default ReportView;
export { Report as SingleReport };